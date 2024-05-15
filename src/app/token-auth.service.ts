import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from './models';

@Injectable({
  providedIn: 'root',
})
export class TokenAuthService {
  constructor(private _http: HttpClient) {}

  public auth(authToken: string) {
    const URL = 'http://localhost:8080/check-token';
    // const URL = 'https://scores.chrum.it/check-token';
    const headers = new HttpHeaders({
      accept: 'aplication/json',
      'Content-Type': 'application/json',
    });
    const requestBody = { 'auth-token': authToken };
    return this._http.post<ResponseData>(URL, requestBody, { headers });
  }
}
