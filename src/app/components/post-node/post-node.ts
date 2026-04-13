import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post-service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-post-node',
  imports: [CommonModule, RouterLink, TimeAgoPipe],
  templateUrl: './post-node.html',
  styleUrl: './post-node.css',
})
export class PostNode {

  @Input() post!: Post;

  currentUserID: string = '';
  openMenu = false;

  constructor(
    private postService: PostService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUserID = this.auth.getUserID();
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  onMute() {
    
    this.openMenu = false;
  }

  onReport() {
    this.openMenu = false;
  }

  onDelete() {
    this.postService.delete(this.post.id).subscribe();
    this.openMenu = false;
  }
}
