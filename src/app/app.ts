import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth-service';
import { CommonModule } from '@angular/common';
import { Header } from './layout/header/header';
import { CreateTopic } from './components/create-topic/create-topic';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, CreateTopic],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('agoraWEB');

  showCreateTopic = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  showHeader(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return this.auth.isAuthenticated() && !hiddenRoutes.includes(this.router.url);
  }
}
