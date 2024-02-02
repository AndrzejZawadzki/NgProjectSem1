import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() finishGameEvent = new EventEmitter<void>();

  @ViewChild(NgxRaceComponent)
  private _race!: NgxRaceComponent;

  gameStatus: string = 'Ready';
  points: number = 0;
  timeSpent: number = 0; // in seconds
  gameplayHistory: { timestamp: Date; action: string }[] = [];
  selectedEventType: string = 'all';
  sortOrder: string = 'latestFirst';

  exitGame() {
    this.exitGameEvent.emit();
  }

  finishGame() {
    this.finishGameEvent.emit();
  }
  /* 
  startGame() {
    this.gameStatus = 'Started';
    this._race.startRace(); // Start ngx-race
    this.updateGameplayHistory('Game Started');
    this.updateTimeSpent(); // Start tracking time
  }

  pauseGame() {
    this.gameStatus = 'Paused';
    this._race.pauseRace(); // Pause ngx-race
    this.updateGameplayHistory('Game Paused');
  }

  resumeGame() {
    this.gameStatus = 'Started';
    this._race.resumeRace(); // Resume ngx-race
    this.updateGameplayHistory('Game Resumed');
  }

  endGame() {
    this.gameStatus = 'Ended';
    this._race.endRace(); // End ngx-race
    this.updateGameplayHistory('Game Ended');
    this.calculatePoints();
  }

  onLineCleared() {
    this.points += 10; // Adjust points calculation as needed
    this.updateGameplayHistory('Line Cleared');
  }

  updateTimeSpent() {
    setInterval(() => {
      if (this.gameStatus === 'Started') {
        this.timeSpent++;
      }
    }, 1000);
  }

  calculatePoints() {
    
  }

  updateGameplayHistory(action: string) {
    this.gameplayHistory.push({ timestamp: new Date(), action });
    this.filterGameplayHistory();
  }

  filterGameplayHistory() {
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
    // Handle ngx-race state changes if needed
    if (state === NgxRaceModule.ENDED) {
      this.endGame();
    }
  }
*/
}
