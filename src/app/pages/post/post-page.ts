import { ChangeDetectorRef, Component } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../components/comment-node/comment-node';
import { Post } from '../../models/Post';
import { CommentService } from '../../services/comment-service';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentNode],
  templateUrl: './post-page.html',
  styleUrl: './post-page.css',
})
export class PostPage {

  post: Post | null = null;
  comments: Comment[] = [];

  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef
  ) {}

  BuildTree(comments: Comment[]): Comment[] {
    const map = new Map<string, Comment>();
    const roots: Comment[] = [];

    comments.forEach(comment => {
      map.set(comment.id, { ...comment, children: [] });
    });

    comments.forEach(comment => {
      if (comment.parent) {
        const parent = map.get(comment.parent.id);
        if (parent) {
          parent.children.push(map.get(comment.id)!);
        }
      } else {
        roots.push(map.get(comment.id)!);
      }
    });
    
    return roots;
  }

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
          this.comments = this.BuildTree(response);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving posts & comments:', error);
        }
      });
    }
  }

  ReloadComments() {
    if (!this.post?.id) return;

    this.commentService.readByPostID(this.post.id).subscribe({
      next: (response) => {
        this.comments = this.BuildTree(response);
        this.cdr.detectChanges();
      }
    });
  }

  submitComment() {
    if (!this.post?.id) return;

    console.log('Submitting comment for postID:', this.post.id, 'with content:', this.newComment);

    this.commentService.create(this.post.id, this.newComment).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
        this.newComment = '';
        this.ReloadComments();
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      }
    });    
  }

  onReply(event: { parentId: string; content: string }) {
    const { parentId, content } = event;

    if (!this.post?.id) return;

    this.commentService.create(this.post.id, content, parentId).subscribe({
      next: (response) => {
        console.log('Reply created successfully:', response);
        this.ReloadComments();
      },
      error: (error) => {
        console.error('Error creating reply:', error);
      }
    });
  }

}
