import { Component } from '@angular/core';
import { TopicService } from '../../services/topic-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../components/comment-node/comment-node';
import { Topic } from '../../models/Topic';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentNode],
  templateUrl: './topic-page.html',
  styleUrl: './topic-page.css',
})
export class TopicPage {

  topic: Topic | null = null;
  comments: any[] = [];

  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.topicService.readAll().subscribe({
        next: (response) => {
          console.log('Topic & Comments retrieved successfully:', response);
          this.topic = response.find(t => t.id === topicId) || null;
        },
        error: (error) => {
          console.error('Error retrieving topics & comments:', error);
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
