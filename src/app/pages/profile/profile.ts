import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import { AuthService } from '../../auth/auth-service';
import { UserService } from '../../services/user-service';
import { CommentNode } from '../../components/comment-node/comment-node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CommentNode],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  nickname: string | null = null;
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // const nickname = this.route.snapshot.paramMap.get('nickname');
    this.nickname = this.auth.getNickname();
    this.userService.readAllPostByNickname('Art').subscribe({
      next: (response) => {
        this.posts = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving posts:', error);
      }
    });

    this.userService.readAllCommentsByNickname('Art').subscribe({
      next: (response) => {
        this.comments = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving comments:', error);
      }
    });

  }

}
