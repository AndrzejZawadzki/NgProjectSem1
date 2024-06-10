import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Score } from './models';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private _http: HttpClient) {}

  public load() {
    const URL = 'https://scores.chrum.it/scores/race';
    // const URL = 'http://localhost:8080/scores/race';
    const headers = new HttpHeaders({ accept: 'application/json' });
    return this._http.get<Score[]>(URL, { headers });
  }

  public postMyScores(authToken: string, playerName: string, points: number) {
    const URL = 'https://scores.chrum.it/scores';
    // const URL = 'http://localhost:8080/scores';
    const headers = new HttpHeaders({
      accept: 'aplication/json',
      'Content-Type': 'application/json',
      'auth-token': authToken,
    });
    const requestBody = { name: playerName, game: 'race', score: points };
    return this._http.post<Score[]>(URL, requestBody, { headers });
  }
}
