import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {

  @Output() close = new EventEmitter<void>();

  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  title: string = '';
  description: string = '';

  constructor(
    private postService: PostService
  ) {}

  closeModal() {
    this.close.emit();
  }

  submitPost() {
    this.postService.create(this.title, this.description).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating post:', error);
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
