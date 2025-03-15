import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DaltonizmService } from '../daltonizm.service';

// import { SharedService } from '../shared.service';

@Component({
  selector: 'app-regest',

  templateUrl: './regest.component.html',
  styleUrls: ['./regest.component.css']
})
export class RegestComponent  implements OnInit {

  passwordVisible: boolean = false;

  selectedClass: any = {};

  // email: string = '';
  // password: string = '';
  // passwordAgain: string = '';

  Name_user: string ='';
  Surname_user: string ='';
  Email_user: string ='';
  Phone_user: string ='';
  Login_user: string ='';
  Password_user: string ='';

  errorMessage: string | null = null;
  loading: boolean = false; // Додали змінну для завантаження

 //
  // log: boolean = false;// Локальна змінна для зберігання стану
 //

 togglePasswordVisibility(){
  this.passwordVisible = !this.passwordVisible;
}


  constructor(private http: HttpClient, private router: Router, private daltonizmService : DaltonizmService) {}

 ngOnInit(): void {
      this.daltonizmService.selectedClass$.subscribe(selectedClass =>{
          this.selectedClass = selectedClass;
      });
  }
  Register_with_Google() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  register() {
    // if (this.password !== this.passwordAgain) {
    //   this.errorMessage = 'Паролі не співпадають';
    //   console.error(this.errorMessage);
    //   return;
    // }

    const registrationData = {
      // email: this.email,
      // password: this.password

      firstName: this.Name_user,
      lastName: this.Surname_user,
      email: this.Email_user,
      phoneNumber: this.Phone_user,
      login: this.Login_user,
      password: this.Password_user
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };

    this.loading = true; // Включаємо стан завантаження

    this.http.post('http://localhost:8080/api/users/register', registrationData, httpOptions)
      .subscribe({
        next: (response) => {
          this.loading = false; // Вимикаємо стан завантаження
          console.log('Response status:', response.status);
          console.log('Response body:', response.body);
          if (response.status === 201) {
            //
            console.log('Реєстрація успішна', response);
            this.router.navigate(['/sing-in']);
            window.location.reload;
          } else {
            this.errorMessage = 'Сталася невідома помилка';
          }
        },
        error: (error) => {
          this.loading = false; // Вимикаємо стан завантаження
          console.error('Помилка:', error);
          if (error.status === 409) {
            this.errorMessage = 'Користувач з такою поштою вже існує';
          } else {
            this.errorMessage = 'Реєстрація не вдалася';
          }
        }

      });

  }

}
