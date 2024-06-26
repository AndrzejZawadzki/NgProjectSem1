import { Component, ViewChild } from '@angular/core';
import { NgxRaceModule, NgxRaceComponent } from 'ngx-race';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { GameplayHistory } from '../models';
import { FormsModule } from '@angular/forms';
import { SortPipe } from '../sort.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { GameInfoService } from '../game-info.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgxRaceModule,
    FilterPipe,
    FormsModule,
    SortPipe,
    RouterLink,
  ],
})
export class GamePageComponent {
  playerName: string;
  studentID: string;
  gameStatus: string = 'Ready';
  points: number = 0;
  timeSpent: number = 0;
  gameplayHistory: GameplayHistory[] = [];
  action: string = '';
  sortOrder = '';
  selectedSortOrder: 'Newest first' | 'Oldest first' = 'Oldest first';
  timer: NodeJS.Timer;
  selectedAction: string;
  selectedColor: string;

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

  constructor(
    private userInfoService: UserInfoService,
    private gameInfoService: GameInfoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    if (this.userInfoService.isVerified === false) {
      alert('Please enter your name and email');
      this._router.navigate(['/intro-page']);
    }

    this.selectedColor = this._route.snapshot.params['colors'];

    this.playerName = this.userInfoService.getPlayerName();

    this.studentID = this.userInfoService.getStudentID();

    this.gameplayHistory = [];
  }

  resetGameplayHistory() {
    return this.gameInfoService.setGameData('Ready', 0, 0, []);
  }
  getGameStatus() {
    return this.gameInfoService.getGameStatus();
  }

  getPoints() {
    return this.gameInfoService.getPoints();
  }

  setGameData(): void {
    this.gameInfoService.setGameData(
      this.gameStatus,
      this.points,
      this.timeSpent,
      this.gameplayHistory
    );
  }

  startGame(): void {
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

  finishGame() {
    this.setGameData();
    this.gameStatus = 'Ended';
    this._router.navigate(['/score-page' /*, this.selectedColor*/]);
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
    this.points += 120;
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
