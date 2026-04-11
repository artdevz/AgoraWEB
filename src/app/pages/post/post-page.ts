import { ChangeDetectorRef, Component } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../components/comment-node/comment-node';
import { Post } from '../../models/Post';
import { CommentService } from '../../services/comment-service';
import { Comment } from '../../models/Comment';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentNode, TimeAgoPipe],
  templateUrl: './post-page.html',
  styleUrl: './post-page.css',
})
export class PostPage {

  post: Post | null = null;
  comments: Comment[] = [];

  newComment: string = '';
  
  currentUserID: string = localStorage.getItem('sub') || '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef
  ) {}

  buildTree(comments: Comment[]): Comment[] {
    const map = new Map<string, Comment>();
    const roots: Comment[] = [];

    comments.forEach(comment => {
      map.set(comment.id, { ...comment, children: [] });
    });

    comments.forEach(comment => {
      const current = map.get(comment.id)!;

      if (comment.parentID) {
        const parent = map.get(comment.parentID);
        if (parent) {
          parent.children.push(current);
        }
      } else {
        roots.push(current);
      }
    });
    
    return roots;
  }

  ngOnInit() {
    this.currentUserID = this.auth.getUserID();
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
          this.comments = this.buildTree(response);
          console.log("Printando todos os comentários: ", this.comments)
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving posts & comments:', error);
        }
      });
    }
  }

  reloadComments() {
    if (!this.post?.id) return;

    this.commentService.readByPostID(this.post.id).subscribe({
      next: (response) => {
        this.comments = this.buildTree(response);
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
        this.reloadComments();
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
        this.reloadComments();
      },
      error: (error) => {
        console.error('Error creating reply:', error);
      }
    });
  }

  editComment(event: { commentId: string; content: string }) {
    const { commentId, content } = event;

    this.commentService.update(commentId, content).subscribe({
      next: (response) => {
        console.log('Comment updated successfully:', response);
        this.reloadComments();
      },
      error: (error) => {
        console.error('Error updating comment:', error);
      }
    });
  }

  deleteComment(commentId: string) {
    this.commentService.delete(commentId).subscribe({
      next: (response) => {
        console.log('Comment deleted successfully:', response);
        this.reloadComments();
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }

}
