import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameplayHistory, Score } from '../models';
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
  points: number;
  timeSpent: number;
  gameplayHistory: GameplayHistory[];
  action: string;
  sortOrder: string;
  selectedSortOrder: 'Newest first' | 'Oldest first' = 'Oldest first';
  selectedAction: string;
  allScores: Score[] = [];
  studentID: string;
  myNameSelected: boolean = false;

  get filteredScores(): Score[] {
    if (this.myNameSelected) {
      return this.allScores.filter((score) => score.name === this.playerName);
    } else {
      return this.allScores;
    }
  }

  constructor(
    private _userInfoService: UserInfoService,
    private _router: Router,
    private _gameInfoService: GameInfoService,
    private _scoresService: ScoresService
  ) {
    // if (this.userInfoService.isVerified === false) {
    //   alert('Please enter your name and email');
    //   this._router.navigate(['/intro-page']);
    // }

    this._scoresService.load().subscribe((data) => {
      this.allScores = data;
    });

    this._scoresService
      .postMyScores(
        this._userInfoService.getStudentID(),
        this._userInfoService.getPlayerName(),
        this._gameInfoService.getPoints()
      )
      .subscribe((data) => {
        this.allScores = data;
      });

    this._scoresService.load().subscribe((data) => {
      this.allScores = data;
    });

    this.playerName = this._userInfoService.getPlayerName();
    this.points = this._gameInfoService.getPoints();
    this.timeSpent = this._gameInfoService.getTimeSpent();
    this.gameplayHistory = this._gameInfoService.getGameplayHistory();
  }

  playAgain(): void {
    this.points = 0;
    this.timeSpent = 0;
    this.gameplayHistory = [];
    this._router.navigate(['/game-page']);
  }
}
