import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-web-camera',
  templateUrl: './web-camera.component.html',
  styleUrls: ['./web-camera.component.css']
})
export class WebcamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  private stream!: MediaStream;
  isStreaming = false;
  isYouTubeStream = false;
  videoUrl = 'https://www.youtube.com/embed/36YnV9STBqc';
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  async startCamera() {
    try {
      this.isYouTubeStream = false;
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.isStreaming = true;
    } catch (error) {
      console.error('Помилка доступу до камери:', error);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.isStreaming = false;
  }

  startYouTubeStream() {
    this.stopCamera();
    this.isYouTubeStream = true;
    
  }
}
