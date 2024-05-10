import { Injectable } from '@angular/core';
import { Scores } from './models';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private _scores: Scores[] = [];

  constructor() {}

  setScore(scores: Scores[]): void {
    this._scores = scores;
  }

  getScores() {
    return this._scores;
  }
}
