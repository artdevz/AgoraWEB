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

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.API}/signup`, {
      username,
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
    return !!localStorage.getItem(this.tokenKey);
  }

}
