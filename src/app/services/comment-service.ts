import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly API = 'http://localhost:8080/comment';

  private createdSource = new Subject<void>();
  created$ = this.createdSource.asObservable();

  private updatedSource = new Subject<void>();
  updated$ = this.updatedSource.asObservable();

  private deletedSource = new Subject<void>();
  deleted$ = this.deletedSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  create(postID: string, content: string, parentID?: string) {
    console.log('Creating comment for postID:', postID, 'with content:', content, 'and parentID:', parentID);
    return this.http.post<any>(`${this.API}`, {
      postID,
      content,
      parentID
    }, {
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => this.createdSource.next())
    );
  }

  update(id: string, content: string) {
    console.log('Updating comment with ID:', id, 'to new content:', content);
    return this.http.put<any>(`${this.API}/${id}`, {
      content
    }, {
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => this.updatedSource.next())
    );
  }

  delete(id: string) {
    console.log('Deleting comment with ID:', id);
    return this.http.delete<void>(`${this.API}/${id}`, {
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => this.deletedSource.next())
    );
  }
  
}
