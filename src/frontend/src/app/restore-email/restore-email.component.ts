import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { DaltonizmService } from '../daltonizm.service';
@Component({
  selector: 'app-restore-email',
  templateUrl: './restore-email.component.html',
  styleUrl: './restore-email.component.css'
})
export class RestoreEmailComponent  implements OnInit{

  Email_user: string = '';
  errorMessage: string | null = null;

  public selectedClass: any = {};

  constructor(private router: Router, private http: HttpClient, private daltonizmService : DaltonizmService) {}

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe(selectedClass=>{
      this.selectedClass = selectedClass;
    });
  }

  Restore_email(){
    const Restore_emailData ={
      email: this.Email_user
    };

    this.http.post('https://springmvcapp.onrender.com/api/users/request-password-reset-email', Restore_emailData)
      .subscribe({
        next: (response: any) => {
          console.log('Restore message Successful', response);
          this.router.navigate(['/new-page2-onlytext'])
        },
        error: (error) => {
          this.errorMessage = 'Restore message Failed';
          console.error('Restore failed', error);
        }
      });
  }
}
