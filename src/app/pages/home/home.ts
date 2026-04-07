import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  posts: Post[] = [];

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

}
