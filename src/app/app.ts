import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth-service';
import { CommonModule } from '@angular/common';
import { Header } from './layout/header/header';
import { CreatePost, } from './components/create-post/create-post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, CreatePost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('agoraWEB');

  showCreatePost = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  showHeader(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return this.auth.isAuthenticated() && !hiddenRoutes.includes(this.router.url);
  }
}
