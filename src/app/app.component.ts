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
  currentPage: 'introPage' | 'gamePage' | 'scorePage' | null = 'introPage';
  currentPlayerName: string = '';
  currentPlayerEmail: string = '';

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
    this.currentPage = null;
  }
  finishGame(event: { playerName: string; playerEmail: string }) {
    this.currentPage = 'scorePage';
  }
  onTurboOnButtonPressed() {}
  onTurboOffButtonPressed() {}
}
