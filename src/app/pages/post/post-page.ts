import { ChangeDetectorRef, Component } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../components/comment-node/comment-node';
import { Post } from '../../models/Post';
import { CommentService } from '../../services/comment-service';

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
    private postService: PostService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const postID = this.route.snapshot.paramMap.get('id');

    if (postID) {
      this.postService.readById(postID).subscribe({
        next: (response) => {
          console.log('Post retrieved successfully:', response);
          this.post = response;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving posts & comments:', error);
        }
      });

      this.commentService.readByPostID(postID).subscribe({
        next: (response) => {
          console.log('Comments retrieved successfully:', response);
          this.comments = response;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving posts & comments:', error);
        }
      });
    }
  }

  submitComment() {
    if (!this.post?.id) return;

    console.log('Submitting comment for postID:', this.post.id, 'with content:', this.newComment);

    this.commentService.create(this.post.id, this.newComment).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
        this.newComment = '';
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      }
    });    
  }

  // if (!this.newComment.trim()) return;

  //   const comment = {
  //     id: Date.now().toString(),
  //     content: this.newComment.trim(),
  //     children: []
  //   };

  //   this.comments.push(comment);
  //   this.newComment = '';
  // }

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
