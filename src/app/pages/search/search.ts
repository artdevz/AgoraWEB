import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post-service';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { PostNode } from '../../components/post-node/post-node';

@Component({
  selector: 'app-search',
  imports: [CommonModule, PostNode],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  posts: Post[] = [];
  queryText: string = "";
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('query');

      if (!query) return;

      this.queryText = query;
      this.loading = true;

      const inicio = performance.now();

      this.postService.search(query).subscribe({
        next: posts => {
          console.log(`Tempo: ${performance.now() - inicio} ms`);
          this.posts = posts;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
    });
  }
}
