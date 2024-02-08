import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameplayHistory } from '../models';
import { FilterPipe } from '../filter.pipe';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, SortPipe],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss',
})
export class ScorePageComponent {
  @Input() playerName = '';
  @Input() playerEmail = '';
  @Input() gameStatus = '';
  @Input() points = 0;
  @Input() timeSpent = 0;
  @Input() selectedAction = '';
  @Input() selectedSortOrder = '';
  @Input() gameplayHistory: GameplayHistory[] = [];
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() startGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
  }>();

  exitGame() {
    this.exitGameEvent.emit();
  }

  startGame() {
    this.startGameEvent.emit({
      playerName: this.playerName,
      playerEmail: this.playerEmail,
    });
  }
}
