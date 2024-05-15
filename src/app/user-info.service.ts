import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _userInfoVerified: boolean = false;
  private _playerName: string;
  private _studentID: string;

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

  setPlayerData(name: string, ID: string): void {
    this._playerName = name;
    this._studentID = ID;
  }

  getPlayerName(): string {
    return this._playerName;
  }

  getStudentID(): string {
    return this._studentID;
  }
}
