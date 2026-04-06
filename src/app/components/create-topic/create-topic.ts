import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../services/topic-service';

@Component({
  selector: 'app-create-topic',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-topic.html',
  styleUrl: './create-topic.css',
})
export class CreateTopic {

  @Output() close = new EventEmitter<void>();

  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  title: string = '';
  description: string = '';

  constructor(
    private topicService: TopicService
  ) {}

  closeModal() {
    this.close.emit();
  }

  submitTopic() {
    this.topicService.create(this.title, this.description).subscribe({
      next: (response) => {
        console.log('Topic created successfully:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating topic:', error);
      }
    });
    
  }

  onFileSelected(event: any) {
    const files = event.target.files;

    for (let file of files) {
      this.selectedFiles.push(file);
      this.previewUrls.push(URL.createObjectURL(file));
    }
  }

  isImage(file: File) {
    return file.type.startsWith('image/');
  }

  isVideo(file: File) {
    return file.type.startsWith('video/');
  }

}
