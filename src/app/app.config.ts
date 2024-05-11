import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ScorePageComponent } from './score-page/score-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'intro-page', component: IntroPageComponent },
      { path: 'game-page', component: GamePageComponent },
      { path: 'score-page', component: ScorePageComponent },
      { path: '**', redirectTo: 'intro-page', pathMatch: 'full' },
    ]),
  ],
};
