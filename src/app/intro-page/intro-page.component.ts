import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  // @Output() startGameEvent = new EventEmitter<{
  //   playerName: string;
  //   playerEmail: string;
  // }>();
  public constructor(
    private _router: Router,
    private _userInfo: UserInfoService
  ) {}

  startGame(data: { playerName: string; playerEmail: string }) {
    // this.startGameEvent.emit(data);
    this._userInfo.verifyUser();
    this._router.navigate(['/game-page']);
  }
}
