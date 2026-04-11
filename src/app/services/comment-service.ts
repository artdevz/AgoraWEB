import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly API = 'http://localhost:8080/comment';

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
    })
  }

  readByPostID(postID: string) {
    return this.http.get<any[]>(`${this.API}/post/${postID}`);
  }

  update(commentID: string, content: string) {
    console.log('Updating comment with ID:', commentID, 'to new content:', content);
    return this.http.put<any>(`${this.API}/${commentID}`, {
      content
    }, {
      responseType: 'text' as 'json'
    });
  }

  delete(commentID: string) {
    console.log('Deleting comment with ID:', commentID);
    return this.http.delete(`${this.API}/${commentID}`, {
      responseType: 'text' as 'json'
    });
  }
  
}
