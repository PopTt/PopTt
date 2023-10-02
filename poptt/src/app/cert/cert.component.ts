import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.css'],
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
export class CertComponent implements OnInit {
  showUploadForm = false;
  projectName: string = '';
  videoUrl: string | null = null;
  zipFileUrl: string | null = null;
  selectedImage: File | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  toggleForm() {
    this.showUploadForm = !this.showUploadForm;
  }
  
  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0] as File;
  }

  uploadFiles() {
    if (this.projectName && this.selectedImage) {
      const formData = new FormData();
      formData.append('projectName', this.projectName);
      formData.append('video', this.selectedImage);

      this.apiService.uploadFile(formData, (response) => {
        console.log(response);
      });
      
      this.showUploadForm = false;
      this.projectName = '';
      this.selectedImage = null;
    }
  }
}