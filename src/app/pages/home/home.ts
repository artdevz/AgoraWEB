import { Component } from '@angular/core';
import { Topic } from '../../models/Topic';
import { TopicService } from '../../services/topic-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  topics: Topic[] = [];

  constructor(
    private topicService: TopicService
  ) {}

  ngOnInit() {
    this.topicService.readAll().subscribe({
      next: (response) => {
        console.log('Topics retrieved successfully:', response);
        this.topics = response;
      },
      error: (error) => {
        console.error('Error retrieving topics:', error);
      }
    });
  }

}
