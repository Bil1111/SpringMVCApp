import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DaltonizmService } from '../daltonizm.service';
@Component({
  selector: 'app-new-password-email',
  templateUrl: './new-password-email.component.html',
  styleUrl: './new-password-email.component.css'
})
export class NewPasswordEmailComponent  implements OnInit{
  New_password: string = '';
  errorMessage: string | null = null;
  selectedClass: any = {};
  constructor(private router:Router, private http:HttpClient, private daltonizmService : DaltonizmService){}

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
      this.selectedClass = selectedClass;
    });
  }

  New_passwor_for_email() {
    const token = new URLSearchParams(window.location.search).get('token'); // Отримати токен з URL
    if (!token) {
      this.errorMessage = 'Invalid or missing token';
      return;
    }

    const new_pass = {
      newPassword: this.New_password
    };

    this.http.post(`http://localhost:8080/api/users/reset-password-email?token=${token}`, new_pass)
      .subscribe({
        next: (response: any) => {
          console.log('Restore Successful', response);
          this.router.navigate(['/']); // Перенаправлення після успішного відновлення
        },
        error: (error) => {
          this.errorMessage = 'Restore Failed';
          console.error('Restore failed', error);
        }
      });
  }
}
