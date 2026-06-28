import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  @Output() toggleThemeEvent = new EventEmitter<void>();
  @Output() openCreatePost = new EventEmitter<void>();

  searchText = '';

  openMenu = false;

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  nickname: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nickname = this.auth.getNickname();
  }

  search() {
    const query = this.searchText.trim();
    if (!query) return;

    console.log("Pesquisando por: " + query);
    this.router.navigate(['/search'], {
      queryParams: { query }
    });
  }

  createPost() {
    this.openCreatePost.emit();
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  goToProfile() {
    this.router.navigate([`/user/${this.auth.getNickname()}`])
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  toggleTheme() {
    console.log("Alterando tema...")
    this.toggleThemeEvent.emit();
  }

  logout() { 
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
