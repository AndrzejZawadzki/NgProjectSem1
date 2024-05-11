import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  introForm: FormGroup;
  @ViewChild('form') form: NgForm;
  playerName: string;
  playerEmail: string;

  private _fb = inject(FormBuilder);

  public playerForm = this._fb.group({
    playerName: ['', [Validators.required, Validators.minLength(3)]],
    playerEmail: ['', [Validators.required, Validators.email]],
  });

  public get name() {
    return this.playerForm.get('playerName') as FormControl;
  }

  public get email() {
    return this.playerForm.controls.playerEmail;
  }

  public constructor(
    private _router: Router,
    private userInfoService: UserInfoService
  ) {}

  setPlayerData(): void {
    console.log(this.playerForm.value);
    this.userInfoService.verifyUser();
    this.userInfoService.setPlayerData(
      this.playerForm.value.playerName!,
      this.playerForm.value.playerEmail!
    );
    this._router.navigate(['/game-page']);
  }
}
