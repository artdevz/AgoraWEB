import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/Comment';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { CommentService } from '../../services/comment-service';

@Component({
  selector: 'app-comment-node',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  templateUrl: './comment-node.html',
  styleUrl: './comment-node.css',
})
export class CommentNode {

  @Input() comment!: Comment;
  @Input() currentUserID!: string;

  showReply = false;
  editing = false;

  replyText = '';
  editText = '';

  constructor(private commentService: CommentService) {}

  sendReply() {
    if (this.replyText.trim()) {
      this.commentService.create(
        this.comment.post.id,
        this.replyText,
        this.comment.id
      ).subscribe();

      this.replyText = '';
      this.showReply = false;
    }
  }

  startEdit() {
    this.editing = true;
    this.editText = this.comment.content;
  }

  cancelEdit() {
    this.editing = false;
    this.editText = '';
  }

  confirmEdit() {
    if (this.editText.trim()) {
      this.commentService.update(
        this.comment.id,
        this.editText
      ).subscribe();
    }

    this.editing = false;
  }

  deleteComment() {
    this.commentService.delete(this.comment.id).subscribe();
  }

}
