import { Component } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { ScoresService } from '../scores.service';

@Component({
  selector: 'app-my-scores-list',
  standalone: true,
  imports: [],
  templateUrl: './my-scores-list.component.html',
  styleUrl: './my-scores-list.component.scss',
})
export class MyScoresListComponent {
  constructor(
    private _userInfo: UserInfoService,
    private _scores: ScoresService
  ) {}
}
