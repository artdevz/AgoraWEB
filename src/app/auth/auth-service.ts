import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly API = 'http://localhost:8080/auth';

  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(nickname: string, email: string, password: string) {
    return this.http.post<any>(`${this.API}/signup`, {
      nickname,
      email,
      password
    })
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/signin`, {
      email,
      password
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);

      return payload.exp > now;
    }
    catch (e) {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  getUserID(): string {
    return this.getPayload()?.sub || '';
  }

  getNickname(): string | null {
    return this.getPayload()?.nickname || null;
  }
}