import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API = 'http://localhost:8080/post';

  private updatedSource = new Subject<string>();
  updated$ = this.updatedSource.asObservable();

  private deletedSource = new Subject<string>();
  deleted$ = this.deletedSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  create(title: string, description: string) {
    console.log('Creating post with title:', title, 'and description:', description);
    return this.http.post<any>(`${this.API}`, {
      title,
      description
    }, {
      responseType: 'text' as 'json'
    });
  }

  readAll() {
    return this.http.get<Post[]>(`${this.API}`);
  }

  readById(id: string) {
    return this.http.get<Post>(`${this.API}/${id}`);
  }

  readAllCommentsByID(id: string) {
    return this.http.get<Comment[]>(`${this.API}/${id}/comments`);
  }

  update(id: string, content: string) {
    return this.http.put<void>(`${this.API}/${id}`, {
      id,
      content
    }).pipe(
      tap(() => this.updatedSource.next(id))
    );
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(
      tap(() => this.deletedSource.next(id))
    );
  }

  mute(post: any) {

  }

  report(post: any) {

  }

}
