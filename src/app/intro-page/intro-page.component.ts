import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
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
  introForm: FormGroup;
  @ViewChild('form') form: NgForm;
  playerName: string;
  playerEmail: string;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private userInfoService: UserInfoService
  ) {}

  setPlayerData(): void {
    this.userInfoService.verifyUser();
    this.userInfoService.setPlayerData(this.playerName, this.playerEmail);
    this._router.navigate(['/game-page']);
  }
}
