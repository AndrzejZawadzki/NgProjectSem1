import { Injectable } from '@angular/core';
import { GameplayHistory } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _userInfoVerified: boolean = false;
  private _playerName: string;
  private _playerEmail: string;

  public get isVerified() {
    return this._userInfoVerified;
  }
  public verifyUser(): void {
    this._userInfoVerified = true;
  }
  public reset(): void {
    this._userInfoVerified = false;
  }

  constructor() {}

  setPlayerData(name: string, email: string): void {
    this._playerName = name;
    this._playerEmail = email;
  }

  getPlayerName(): string {
    return this._playerName;
  }

  getPlayerEmail(): string {
    return this._playerEmail;
  }
}
