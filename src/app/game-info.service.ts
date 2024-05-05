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

  getTimeSpent(): number {
    return this._timeSpent;
  }

  getGameplayHistory(action: string) {
    return (this._gameplayHistory = [
      ...this._gameplayHistory,
      { timeStamp: new Date(), action },
    ]);
  }
}
