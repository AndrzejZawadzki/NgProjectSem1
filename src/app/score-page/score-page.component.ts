import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameplayHistory, Scores } from '../models';
import { FilterPipe } from '../filter.pipe';
import { SortPipe } from '../sort.pipe';
import { Router, RouterLink } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { GameInfoService } from '../game-info.service';
import { ScoresService } from '../scores.service';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, SortPipe, RouterLink],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss',
})
export class ScorePageComponent {
  playerName: string;
  playerEmail: string;
  points: number;
  timeSpent: number;
  gameplayHistory: GameplayHistory[];
  action: string;
  sortOrder: string;
  selectedSortOrder: 'Newest first' | 'Oldest first' = 'Oldest first';
  selectedAction: string;
  scores: Scores[] = [];

  constructor(
    private userInfoService: UserInfoService,
    private _router: Router,
    private gameInfoService: GameInfoService,
    private scoresService: ScoresService
  ) {
    if (this.userInfoService.isVerified === false) {
      alert('Please enter your name and email');
      this._router.navigate(['/intro-page']);
    }
    this.playerName = this.userInfoService.getPlayerName();
    this.points = this.gameInfoService.getPoints();
    this.timeSpent = this.gameInfoService.getTimeSpent();
    this.gameplayHistory = this.gameInfoService.getGameplayHistory();
    this.scores = this.scoresService.getScores();
  }

  playAgain(): void {
    this.points = 0;
    this.timeSpent = 0;
    this.gameplayHistory = [];
    this.updateScores(this.playerName, this.points);
    this._router.navigate(['/game-page']);
  }

  updateScores(name: string, score: number) {
    this.scores = [...this.scores, { name, score }];
  }
}
