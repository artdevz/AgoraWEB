import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/Comment';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';

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
  @Output() reply = new EventEmitter< { parentId: string; content: string }>();
  @Output() edit = new EventEmitter< { commentId: string; content: string }>();
  @Output() delete = new EventEmitter<string>();

  showReply = false;
  editing = false;

  replyText = '';
  editText = '';

  sendReply() {
    if (this.replyText.trim()) {
      this.reply.emit({
        parentId: this.comment.id,
        content: this.replyText.trim()  
      });

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
      this.edit.emit({
        commentId: this.comment.id,
        content: this.editText.trim()
      });
    }

    this.editing = false;
  }

  deleteComment() {
    this.delete.emit(this.comment.id);
  }

}
