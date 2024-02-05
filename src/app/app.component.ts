import { Component } from '@angular/core';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CommonModule } from '@angular/common';
import { ScorePageComponent } from './score-page/score-page.component';

type Player = string;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IntroPageComponent,
    GamePageComponent,
    ScorePageComponent,
    CommonModule,
  ],
  standalone: true,
})
export class AppComponent {
  currentPage: 'introPage' | 'gamePage' | 'scorePage' | null = 'gamePage';
  currentPlayerName: string = '';
  currentPlayerEmail: string = '';
  currentGameStatus: string = '';
  currentPoints: number = 0;
  currentTimeSpent: number;

  gameData: {
    events: Event[];
    score: number;
    gamePlayTime: number;
  };
  allPlayers: Player[] = [];

  startGame(event: { playerName: string; playerEmail: string }) {
    this.currentPlayerName = event.playerName;
    this.currentPage = 'gamePage';
    this.currentPlayerEmail = event.playerEmail;
  }
  exitGame() {
    this.currentPage = 'introPage';
  }
  finishGame(event: {
    playerName: string;
    playerEmail: string;
    gameStatus: string;
    points: number;
    timeSpent: number;
  }) {
    this.currentPage = 'scorePage';
    this.currentPlayerName = event.playerName;
    this.currentPlayerEmail = event.playerEmail;
    this.currentGameStatus = event.gameStatus;
    this.currentPoints = event.points;
    this.currentTimeSpent = event.timeSpent;
  }
}
