import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'intro-page', component: IntroPageComponent },
      { path: 'game-page', component: GamePageComponent },
      { path: 'game-page/:colors', component: GamePageComponent },
      { path: 'score-page', component: ScorePageComponent },
      { path: '**', redirectTo: 'intro-page', pathMatch: 'full' },
    ]),
    provideHttpClient(),
  ],
};
