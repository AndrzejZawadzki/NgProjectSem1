import { Component } from '@angular/core';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [IntroPageComponent, GamePageComponent, CommonModule],
  standalone: true,
})
export class AppComponent {
  currentPage: 'introPage' | 'gamePage' | 'scorePage' = 'introPage';
  currentPlayerName: string = '';

  startGame(event: { playerName: string; playerEmail: string }) {
    this.currentPlayerName = event.playerName;
    this.currentPage = 'gamePage';
  }
  exitGame() {
    this.currentPage = 'introPage';
  }
  finishGame() {
    this.currentPage = 'scorePage';
  }
}
