import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgxRaceModule, NgxRaceComponent } from 'ngx-race';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { GameplayHistory } from '../models';
import { FormsModule } from '@angular/forms';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxRaceModule, FilterPipe, FormsModule, SortPipe],
})
export class GamePageComponent {
  @Input() playerName: string = '';
  @Input() playerEmail: string = '';
  @Input() gameplayHistory: GameplayHistory[] = [];
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() finishGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
    gameStatus: string;
    points: number;
    timeSpent: number;
    selectedAction: string;
    gameplayHistory: GameplayHistory[];
    selectedSortOrder: string;
  }>();
  timer: NodeJS.Timer;
  gameStatus: string = 'Ready';
  points: number = 0;
  timeSpent: number = 0;
  //gameplayHistory: GameplayHistory[] = [];
  selectedAction = '';
  sortOrder = '';
  selectedSortOrder: 'Newest first' | 'Oldest first' = 'Oldest first';

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
      selectedAction: this.selectedAction,
      gameplayHistory: this.gameplayHistory,
      selectedSortOrder: this.selectedSortOrder,
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
    this._race.actionStop(); // Pause ngx-race
    this.stopTimer();
    this.updateGameplayHistory('Game Paused');
  }

  resumeGame() {
    this.gameStatus = 'Started';
    this._race.actionStart(); // Resume ngx-race
    this.startTimer();
    this.updateGameplayHistory('Game Resumed');
  }

  endGame() {
    this.gameStatus = 'Ended';
    this._race.actionStop(); // End ngx-race
    this.updateGameplayHistory('Game Ended');
    this.stopTimer();
    this.finishGame();
  }
  resetGame() {
    this.gameStatus = 'Ready';
    this._race.actionReset();
    this.stopTimer();
    this.timeSpent = 0;
    this.points = 0;
    this.gameplayHistory = [];
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
    }, 2000);
  }

  updateGameplayHistory(action: string) {
    this.gameplayHistory = [
      ...this.gameplayHistory,
      { timeStamp: new Date(), action },
    ];
  }
}
