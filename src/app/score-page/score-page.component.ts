import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameplayHistory } from '../models';
import { FilterPipe } from '../filter.pipe';
import { SortPipe } from '../sort.pipe';
import { Router, RouterLink } from '@angular/router';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, SortPipe, RouterLink],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss',
})
export class ScorePageComponent {
  constructor(private _userInfo: UserInfoService, private _router: Router) {
    if (this._userInfo.isVerified === false) {
      alert('Please enter your name and email');
      this._router.navigate(['/intro-page']);
    }
  }
  @Input() playerName = '';
  @Input() playerEmail = '';
  @Input() gameStatus = '';
  @Input() points = 0;
  @Input() timeSpent = 0;
  @Input() selectedAction = '';
  @Input() selectedSortOrder: 'Newest first' | 'Oldest first' = 'Oldest first';
  @Input() gameplayHistory: GameplayHistory[] = [];
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() startGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
  }>();
}
