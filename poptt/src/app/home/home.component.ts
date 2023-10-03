import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  projects: any[] = [];
  // zipFileUrl: string | null = null;
  // selectedVideo: File | null = null;
  // selectedDocuments: File[] = [];

  constructor(private apiService: ApiService, private router: Router, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.getUserDataByUID();
}

  toggleForm() {
    this.showUploadForm = !this.showUploadForm;
  }
  
  // onVideoSelect(event: any) {
  //   this.selectedVideo = event.target.files[0] as File;
  // }

  uploadFiles() {
    if (this.projectName && this.videoUrl) {
      const formData = new FormData();
      formData.append('projectName', this.projectName);
      formData.append('videoUrl', this.videoUrl);
      const hasUID = localStorage.getItem('UID') || null;

      if(hasUID){
        this.apiService.uploadProject(this.projectName, this.videoUrl, parseInt(hasUID, 10), (response) => {
          console.log(response)
          if (response.success) {
            this.projectName = '';
            this.videoUrl = '';
            this.showUploadForm = false;
            alert("Your project has been successfully saved");
          } else {
              alert("upload project failed.");
          }
        });
      }else{
        this.router.navigate(['/login']);
      }
      
    } else {
      alert("The form is not yet finished.");
    }
  }

  getUserDataByUID() {
    const hasUID = localStorage.getItem('UID') || null;

    if (hasUID) {
        this.apiService.getUserDataByUID(parseInt(hasUID, 10), (response) => {
            if (response && response.projects) {
                // Assign the received projects data to the projects property
                this.projects = response.projects;
            } else {

            }
        });
    } else {
        this.router.navigate(['/login']);
    }
}
  
embedYouTubeUrl(url: string): SafeResourceUrl {
  // Check if the URL is a YouTube URL
  if (url.includes("youtube.com/watch?v=")) {
      // Replace "watch?v=" with "embed/"
      const embed_url = url.replace("watch?v=", "embed/")
      console.log(embed_url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(embed_url);
  }

  return url;
}

renderVideo(url: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  // saveFile(file: File | null, fileName: string, directory: string): boolean {
  //   if (file && window.Blob) {
  //     const blob = new Blob([file], { type: file.type });
  //     const blobUrl = URL.createObjectURL(blob);
  
  //     const a = document.createElement('a');
  //     a.href = blobUrl;
  //     a.download = fileName;
  
  //     // Trigger a click event to initiate the download
  //     a.click();
  
  //     // Clean up
  //     window.URL.revokeObjectURL(blobUrl);
  
  //     // File successfully saved
  //     return true;
  //   }
  
  //   // File not saved
  //   return false;
  // }

}