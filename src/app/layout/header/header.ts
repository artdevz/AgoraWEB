import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  @Output() openCreatePost = new EventEmitter<void>();

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  nickname: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nickname = this.getNicknameFromToken();
  }

  createPost() {
    this.openCreatePost.emit();
  }

  logout() { 
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private getNicknameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.nickname || null;
    }
    catch {
      return null;
    }
  }

}
