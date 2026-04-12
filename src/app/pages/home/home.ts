import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, TimeAgoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  posts: Post[] = [];
  openMenuID: string | null = null;
  admin = false;

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.postService.readAll().subscribe({
      next: (response) => {
        console.log('Posts retrieved successfully:', response);
        this.posts = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving posts:', error);
      }
    });
  }

  toggleMenu(postID: string) {
    this.openMenuID = this.openMenuID === postID ? null : postID;
  }

  mute(post: Post) {
    console.log("Silenciar usuário ", post.author);
  }

  report(post: Post) {
    console.log("Denunciar Usuário + Post", post.author, " com seu post ", post);
  }

  ban(post: Post) {
    console.log("Banir usuário ", post.author);
  }

}
