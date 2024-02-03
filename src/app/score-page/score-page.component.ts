import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.scss',
})
export class ScorePageComponent {
  @Input() playerName: string = '';
  @Output() exitGameEvent = new EventEmitter<void>();
  @Output() startGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
  }>();

  exitGame() {
    this.exitGameEvent.emit();
  }

  startGame() {
    this.startGameEvent.emit();
  }
}
