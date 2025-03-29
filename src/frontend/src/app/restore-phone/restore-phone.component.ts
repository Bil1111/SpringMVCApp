import { Component, OnInit } from '@angular/core';
import { DaltonizmService } from '../daltonizm.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-restore-phone',
  templateUrl: './restore-phone.component.html',
  styleUrl: './restore-phone.component.css'
})
export class RestorePhoneComponent  implements OnInit {
  Phone_user: string = '';
  errorMessage: string | null = null;
  public selectedClass: any = {};

  constructor(private router: Router, private http: HttpClient, private daltonizmService: DaltonizmService) {

  }

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
      this.selectedClass = selectedClass;
    });
  }

  Restore_phone() {
    const Restore_phoneData = {
      phoneNumber: this.Phone_user
    };

    this.http.post('https://springmvcapp.onrender.com/api/users/request-password-reset-phone', Restore_phoneData)
      .subscribe({
        next: (response: any) => {
          console.log('Restore Successful', response);
          this.router.navigate(['/new-password-phone']);
        },
        error: (error) => {
          this.errorMessage = 'Restore Failed';
          console.error('Restore failed', error);
        }
      });
  }
}
