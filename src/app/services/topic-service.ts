import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private readonly API = 'http://localhost:8080/topic';

  constructor(
    private http: HttpClient
  ) {}

  create(title: string, description: string) {
    console.log('Creating topic with title:', title, 'and description:', description);
    return this.http.post<any>(`${this.API}`, {
      title,
      description
    }, {
      responseType: 'text' as 'json'
    })
  }

  readAll() {
    return this.http.get<any[]>(`${this.API}`);
  }

  readById(id: string) {
    return this.http.get<any>(`${this.API}/${id}`);
  }

}
