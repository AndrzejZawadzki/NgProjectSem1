import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameplayHistory } from '../models';
import { FilterPipe } from '../filter.pipe';
import { SortPipe } from '../sort.pipe';
import { Router, RouterLink } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { GameInfoService } from '../game-info.service';

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

  constructor(
    private userInfoService: UserInfoService,
    private _router: Router,
    private gameInfoService: GameInfoService
  ) {
    if (this.userInfoService.isVerified === false) {
      alert('Please enter your name and email');
      this._router.navigate(['/intro-page']);
    }
    this.playerName = this.userInfoService.getPlayerName();
    this.points = this.gameInfoService.getPoints();
    this.timeSpent = this.gameInfoService.getTimeSpent();
  }
}
