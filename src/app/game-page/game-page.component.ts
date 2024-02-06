import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgxRaceModule, NgxRaceComponent } from 'ngx-race';
import { CommonModule } from '@angular/common';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxRaceModule],
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @Input() playerEmail: string = '';
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() finishGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
    gameStatus: string;
    points: number;
    timeSpent: number;
  }>();
  timer: NodeJS.Timer;
  gameStatus: string = 'Ready';
  points: number = 0;
  timeSpent: number = 0;
  gameplayHistory: { timestamp: Date; action: string }[] = [];
  selectedEventType: string = 'all';
  sortOrder: string = 'latestFirst';

  @ViewChild(NgxRaceComponent)
  private _race: NgxRaceComponent;
  public onTurboOnButtonPressed() {
    this._race.actionTurboOn();
  }
  public onTurboOffButtonPressed() {
    this._race.actionTurboOff();
  }
  public onActionStartButtonPressed() {
    this._race.actionStart();
  }
  public onActionStopButtonPressed() {
    this._race.actionStop();
  }
  public onActionResetButtonPressed() {
    this._race.actionReset();
  }
  public onActionLeftButtonPressed() {
    this._race.actionLeft();
  }
  public onActionRightButtonPressed() {
    this._race.actionRight();
  }

  exitGame() {
    this.exitGameEvent.emit();
  }
  finishGame() {
    this.finishGameEvent.emit({
      playerName: this.playerName,
      playerEmail: this.playerEmail,
      gameStatus: this.gameStatus,
      points: this.points,
      timeSpent: this.timeSpent,
    });
  }

  startGame() {
    this.gameStatus = 'Started';
    this._race.actionStart(); // Start ngx-race
    this.updateGameplayHistory('Game Started');
    this.startTimer(); // Start tracking time
  }

  stopGame() {
    this.gameStatus = 'Paused';
    this._race.actionStop();
    this.stopTimer(); // Pause ngx-race
    this.updateGameplayHistory('Game Paused');
  }

  resumeGame() {
    this.gameStatus = 'Started';
    this._race.actionStart();
    this.startTimer(); // Resume ngx-race
    this.updateGameplayHistory('Game Resumed');
  }

  endGame() {
    this.gameStatus = 'Ended';
    this._race.actionStop();
    // End ngx-race
    this.updateGameplayHistory('Game Ended');
  }
  resetGame() {
    this.gameStatus = 'Ready';
    this._race.actionReset();
    this.stopTimer();
    this.timeSpent = 0;
    this.points = 0;
  }
  turboOn() {
    this._race.actionTurboOn();
    this.updateGameplayHistory('Turbo On');
    this.points += 3;
  }
  turboOff() {
    this._race.actionTurboOff();
    this.updateGameplayHistory('Turbo Off');
  }

  grantPoints() {
    this.points += 10;
    this.updateGameplayHistory('Car overtaken');
  }

  actionLeft() {
    this._race.actionLeft();
    this.updateGameplayHistory('Action Left');
    this.points -= 1;
  }

  actionRight() {
    this._race.actionRight();
    this.updateGameplayHistory('Action Right');
    this.points -= 1;
  }

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.timeSpent = this.timeSpent + 1000;
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer as any);
  }

  gameOver() {
    this.stopTimer();
    this.gameStatus = 'Ended';
    setTimeout(() => {
      this.finishGame();
    }, 1000);
  }

  updateGameplayHistory(action: string) {
    this.gameplayHistory.push({ timestamp: new Date(), action });
    //this.filterGameplayHistory();
  }

  /*  filterGameplayHistory() {
    if (this.selectedEventType === 'all') {
      this.filterGameplayHistory = [...this.gameplayHistory];
    } else {
      this.filteredGameplayHistory = this.gameplayHistory.filter((event) =>
        event.action
          .toLowerCase()
          .includes(this.selectedEventType.toLowerCase())
      );
    }

    if (this.sortOrder === 'latestFirst') {
      this.filteredGameplayHistory.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      );
    } else {
      this.filteredGameplayHistory.sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      );
    }
  }

  onRaceStateChange(state: NgxRaceModule) {
    if (state === NgxRaceModule.ENDED) {
      this.endGame();
    }
  }

} */
}
