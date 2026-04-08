import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-comment-node',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-node.html',
  styleUrl: './comment-node.css',
})
export class CommentNode {

  @Input() comment!: Comment;
  @Output() reply = new EventEmitter< { parentId: string; content: string }>();

  showReply = false;
  replyText = '';

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

}
