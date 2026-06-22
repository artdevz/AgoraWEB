import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MuteService {
  private readonly API = 'http://localhost:8080/mute';

  constructor(
    private http: HttpClient
  ) {}

  mute(userID: string) {
    return this.http.post<any>(`${this.API}/${userID}`, {
      userID
    });
  }

  unmute(userID: string) {} // To-Do
}
