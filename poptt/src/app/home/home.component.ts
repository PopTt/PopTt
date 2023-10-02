import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('buttonState', [
      state('true', style({
        transform: 'rotate(45deg)'
      })),
      state('false', style({
        transform: 'rotate(0deg)'
      })),
      transition('true <=> false', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  showUploadForm = false;
  projectName: string = '';
  videoUrl: string | null = null;
  zipFileUrl: string | null = null;
  selectedVideo: File | null = null;
  selectedDocuments: File[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  toggleForm() {
    this.showUploadForm = !this.showUploadForm;
  }
  
  onVideoSelect(event: any) {
    this.selectedVideo = event.target.files[0] as File;
  }

  uploadFiles() {
    if (this.projectName && this.selectedVideo) {
      const formData = new FormData();
      formData.append('projectName', this.projectName);
      formData.append('video', this.selectedVideo);
  
  
      // Upload the files using the API service
      this.apiService.uploadFile(formData, (response) => {
        console.log(response);
      });
  
      const videoSaved = this.saveFile(this.selectedVideo, `${this.projectName}_video.mp4`, 'C:/Users/Lenovo/OneDrive/文档/GitHub/PopTt/poptt/local-storage/videos');

      // Reset form values and close the form
      if (videoSaved) {
        alert("Your work has been successfully saved")
      } else {
        alert("Save failed.")
      }
      this.showUploadForm = false;
      this.projectName = '';
      this.selectedVideo = null;
      
    }else{
      alert("The form is not yet finished.")
    }
  }
  
  saveFile(file: File | null, fileName: string, directory: string): boolean {
    if (file && window.Blob) {
      const blob = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
  
      // Trigger a click event to initiate the download
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
  
      // File successfully saved
      return true;
    }
  
    // File not saved
    return false;
  }

}