import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgxRaceModule, NgxRaceComponent } from 'ngx-race';
import { CommonModule } from '@angular/common';

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
    this.finishGameEvent.emit();
  }

  startGame() {
    this.gameStatus = 'Started';
    this._race.actionStart(); // Start ngx-race
    //this.updateGameplayHistory('Game Started');
    this.startTimer(); // Start tracking time
  }

  stopGame() {
    this.gameStatus = 'Paused';
    this._race.actionStop();
    this.stopTimer(); // Pause ngx-race
    //this.updateGameplayHistory('Game Paused');
  }

  resumeGame() {
    this.gameStatus = 'Started';
    this._race.actionStart();
    this.startTimer(); // Resume ngx-race
    //this.updateGameplayHistory('Game Resumed');
  }

  endGame() {
    this.gameStatus = 'Ended';
    this._race.actionStop(); // End ngx-race
    //this.updateGameplayHistory('Game Ended');
    this.calculatePoints();
  }
  resetGame() {
    this.gameStatus = 'Ready';
    this._race.actionReset();
    this.stopTimer();
    this.timeSpent = 0;
    this.points = 0;
  }

  grantPoints() {
    this.points += 10;
    //this.updateGameplayHistory('Line Cleared');
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
  calculatePoints() {}

  /*   updateGameplayHistory(action: string) {
    this.gameplayHistory.push({ timestamp: new Date(), action });
    this.filterGameplayHistory();
  } */

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

/* export class RaceContainingComponent {
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
}
*/
