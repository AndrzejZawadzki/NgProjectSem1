import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _userInfoVerified: boolean = false;
  private _playerName: string;
  private _playerEmail: string;
  private _gameStatus: string = 'Ready';
  private _points: number = 0;

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

  setNewGameDataBeforeStart(gameStatus: string, points: number): void {
    this._gameStatus = gameStatus;
    this._points = points;
  }

  getGameStatus(): string {
    return this._gameStatus;
  }

  getPoints(): number {
    return this._points;
  }
}
