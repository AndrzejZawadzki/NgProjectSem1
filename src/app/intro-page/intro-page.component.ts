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

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  public introForm: FormGroup;
  @ViewChild('form')
  public form: NgForm;
  public playerName: string;
  public studentID: string;
  public isAuthorized: boolean;
  private _fb = inject(FormBuilder);
  public selectedColor: string = '';
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
    selectedColor: ['Normal'],
  });

  public get name() {
    return this.playerForm.get('playerName') as FormControl;
  }

  public get ID() {
    return this.playerForm.controls['studentID'];
  }

  public constructor(
    private _router: Router,
    private _userInfoService: UserInfoService,
    private _tokenAuthService: TokenAuthService
  ) {}

  setPlayerData(): void {
    const studentIDString: string = this.playerForm.value.studentID!.toString();
    this._tokenAuthService.auth(studentIDString).subscribe((data) => {
      if (data.success) {
        this._userInfoService.verifyUser();
        this._userInfoService.setPlayerData(
          this.playerForm.value.playerName!,
          this.playerForm.value.studentID!
        );

        const selectedColor = this.playerForm.value.selectedColor;
        localStorage.setItem('selectedColor', selectedColor);
        this._router.navigate(['/game-page', selectedColor]);
      } else {
        alert('Invalid ID');
        this.playerForm.patchValue({ playerName: '', studentID: '' });
      }
    });
  }
}
