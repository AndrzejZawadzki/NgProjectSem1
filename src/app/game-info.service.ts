import { Injectable } from '@angular/core';
import { GameplayHistory } from './models';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private _gameStatus: string = 'Ready';
  private _points: number = 0;
  private _timeSpent: number = 0;
  private _gameplayHistory: GameplayHistory[] = [];

  constructor() {}

  setGameData(
    gameStatus: string,
    points: number,
    timeSpent: number,
    gameplayHistory: GameplayHistory[]
  ): void {
    this._gameStatus = gameStatus;
    this._points = points;
    this._timeSpent = timeSpent;
    this._gameplayHistory = gameplayHistory;
  }

  getGameStatus(): string {
    return this._gameStatus;
  }

  getPoints(): number {
    return this._points;
  }

  getTimeSpent(): number {
    return this._timeSpent;
  }

  getGameplayHistory() {
    return this._gameplayHistory;
  }
}
