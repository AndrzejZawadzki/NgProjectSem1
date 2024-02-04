import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  NgModule,
} from '@angular/core';
import { NgxRaceModule, NgxRaceComponent } from 'ngx-race';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

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
  @Output() onTurboOnButtonPressedEvent = new EventEmitter<void>();
  @Output() onTurboOffButtonPressedEvent = new EventEmitter<void>();
  @Output() actionStartEvent = new EventEmitter<void>();

  @Output()
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
  /* onTurboOnButtonPressed() {
    this.onTurboOnButtonPressedEvent.emit();
  }
  onTurboOffButtonPressed() {
    this.onTurboOffButtonPressedEvent.emit(); 
  }
*/
  startGame() {
    this.gameStatus = 'Started';
    this._race.actionStart(); // Start ngx-race
    //this.updateGameplayHistory('Game Started');
    this.updateTimeSpent(); // Start tracking time
  }

  pauseGame() {
    this.gameStatus = 'Paused';
    this._race.actionStop(); // Pause ngx-race
    //this.updateGameplayHistory('Game Paused');
  }

  resumeGame() {
    this.gameStatus = 'Started';
    this._race.actionStart(); // Resume ngx-race
    //this.updateGameplayHistory('Game Resumed');
  }

  endGame() {
    this.gameStatus = 'Ended';
    this._race.actionStop(); // End ngx-race
    //this.updateGameplayHistory('Game Ended');
    this.calculatePoints();
  }

  onLineCleared() {
    this.points += 10;
    //this.updateGameplayHistory('Line Cleared');
  }

  updateTimeSpent() {
    setInterval(() => {
      if (this.gameStatus === 'Started') {
        this.timeSpent++;
      }
    }, 1000);
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
