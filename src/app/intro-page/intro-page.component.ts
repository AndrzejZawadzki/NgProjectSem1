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
import { TokenAuthService } from '../token-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ScoresService } from '../scores.service';

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
  studentID: string;
  isAuthorized: boolean;

  private _fb = inject(FormBuilder);

  public playerForm: FormGroup = this._fb.group({
    playerName: ['', [Validators.required, Validators.minLength(3)]],
    studentID: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
  });

  public get name() {
    return this.playerForm.get('playerName') as FormControl;
  }

  public get ID() {
    return this.playerForm.controls['studentID'];
  }

  public constructor(
    private _router: Router,
    private userInfoService: UserInfoService,
    private _tokenAuthService: TokenAuthService
  ) {}

  setPlayerData(): void {
    const studentIDString: string = this.playerForm.value.studentID!.toString();
    this._tokenAuthService.auth(studentIDString).subscribe((data) => {
      if (data.success) {
        this.userInfoService.verifyUser();
        this.userInfoService.setPlayerData(
          this.playerForm.value.playerName!,
          this.playerForm.value.studentID!
        );
        this._router.navigate(['/game-page']);
      } else {
        alert('Invalid ID');
        console.log(data.success);
        this.playerForm.patchValue({ playerName: '', studentID: '' });
      }
    });
  }
}
