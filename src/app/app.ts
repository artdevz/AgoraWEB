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

  theme: 'light' | 'dark' = 'light';
  showCreatePost = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

    this.theme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme); 
    console.log("Tema alterado para: ", this.theme);
  }

  showHeader(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return this.auth.isAuthenticated() && !hiddenRoutes.includes(this.router.url);
  }
}
