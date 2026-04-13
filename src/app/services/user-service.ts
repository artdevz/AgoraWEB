import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient
  ) {}

  readByNickname(nickname: string) {
    return this.http.get<any>(`${this.API}/${nickname}`);
  }

  readAllPostByNickname(nickname: string) {
    return this.http.get<any[]>(`${this.API}/${nickname}/posts`);
  }

  readAllCommentsByNickname(nickname: string) {
    return this.http.get<any[]>(`${this.API}/${nickname}/comments`);
  }
}
