import { ChangeDetectorRef, Component } from '@angular/core';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import { UserService } from '../../services/user-service';
import { CommentNode } from '../../components/comment-node/comment-node';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { User } from '../../models/User';
import { PostNode } from '../../components/post-node/post-node';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, PostNode, CommentNode, TimeAgoPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  user: User | null = null;
  avatarUrl: string = '';

  posts: Post[] = [];
  comments: Comment[] = [];

  tab: 'overview' | 'posts' | 'comments' = 'overview';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const nickname = this.route.snapshot.paramMap.get('nickname');
    if (!nickname) return;

    this.userService.readByNickname(nickname).subscribe({
      next: (response) => {
        this.user = response;
        this.cdr.detectChanges();
      }
    });

    this.userService.readAllPostByNickname(nickname).subscribe({
      next: (response) => {
        this.posts = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving posts:', error);
      }
    });

    this.userService.readAllCommentsByNickname(nickname).subscribe({
      next: (response) => {
        this.comments = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving comments:', error);
      }
    });
  }

  setTab(tab: 'overview' | 'posts' | 'comments') {
    this.tab = tab;
  }

}
