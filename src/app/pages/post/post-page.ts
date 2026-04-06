import { Component } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../components/comment-node/comment-node';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentNode],
  templateUrl: './post-page.html',
  styleUrl: './post-page.css',
})
export class PostPage {

  post: Post | null = null;
  comments: any[] = [];

  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    const postID = this.route.snapshot.paramMap.get('id');
    if (postID) {
      this.postService.readAll().subscribe({
        next: (response) => {
          console.log('Post & Comments retrieved successfully:', response);
          this.post = response.find(p => p.id === postID) || null;
        },
        error: (error) => {
          console.error('Error retrieving posts & comments:', error);
        }
      });
    }
  }

  submitComment() {
    if (!this.newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      content: this.newComment.trim(),
      children: []
    };

    this.comments.push(comment);
    this.newComment = '';
  }

  onReply(event: any) {
    const { parentId, content } = event;

    const newComment = {
      id: Date.now().toString(),
      content,
      children: []
    };

    this.addReply(this.comments, parentId, newComment);
  }

  addReply(comments: any[], parentId: string, reply: any) {
    for (let comment of comments) {
      if (comment.id === parentId) {
        comment.children.push(reply);
        return true;
      }

      if (comment.children?.length) {
        const found = this.addReply(comment.children, parentId, reply);
        if (found) return true;
      }
    }

    return false;
  }

}
