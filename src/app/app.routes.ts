import { Routes } from '@angular/router';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
  { path: 'intro-page', component: IntroPageComponent },
  // Domyślna trasa - przekierowanie na intro-page
  { path: '*', redirectTo: 'intro-page', pathMatch: 'full' },
  { path: 'game-page', component: GamePageComponent },
];
