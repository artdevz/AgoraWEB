import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post-service';
import { CommonModule } from '@angular/common';
import { PostNode } from '../../components/post-node/post-node';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PostNode],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  posts: Post[] = [];
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

    this.postService.deleted$.subscribe((id: string) => {
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }

}
