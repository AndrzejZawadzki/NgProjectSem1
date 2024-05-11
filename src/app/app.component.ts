import { Component } from '@angular/core';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CommonModule } from '@angular/common';
import { ScorePageComponent } from './score-page/score-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IntroPageComponent,
    GamePageComponent,
    ScorePageComponent,
    CommonModule,
    RouterOutlet,
  ],
  standalone: true,
})
export class AppComponent {}
