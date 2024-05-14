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
    const headers = new HttpHeaders({ accept: 'application/json' });
    return this._http.get<Score[]>(URL, { headers });
  }
}
