import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  @Output() startGameEvent = new EventEmitter<{
    playerName: string;
    playerEmail: string;
  }>();

  playerName: string = '';
  playerEmail: string = '';

  formIsValid(): boolean {
    return this.playerName.trim() !== '' && this.playerEmail.trim() !== '';
  }

  startGame() {
    if (this.formIsValid()) {
      this.startGameEvent.emit({
        playerName: this.playerName,
        playerEmail: this.playerEmail,
      });
    } else {
      alert('Please fill out the form correctly!');
    }
  }
}
