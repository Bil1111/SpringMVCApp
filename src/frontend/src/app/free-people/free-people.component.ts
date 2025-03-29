import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-free-people',
  templateUrl: './free-people.component.html',
  styleUrls: ['./free-people.component.css']
})
export class FreePeopleComponent implements OnInit {
  // ДАНІ КОРИСТУВАЧА
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contactNumber: string = '';
  shelter: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;


  shelters: any[] = []; // Масив для зберігання всіх притулків
  selectedShelter: any = null; // Для зберігання вибраного притулку

  constructor(private http: HttpClient) {}


   ngOnInit() {
    this.fetchShelters();
   }
// 'Received shelters data:',
  // Метод для отримання всіх притулків
  fetchShelters() {
    this.http.get<any[]>('https://springmvcapp.onrender.com/api/shelters').subscribe(
      data => {
        console.log( data); // Логування отриманих даних
        this.shelters = data.map(shelter => {
          // Генеруємо URL для зображення кожного притулку
          // shelter.imageURL = `https://springmvcapp.onrender.com/images/shelters/${shelter.id}.png`;
          return shelter;
        });
      },
      error => {
        console.error('Error fetching shelters:', error); // Логування помилки
      }
    );
  }

  // Метод для вибору притулку
  selectShelter(shelter: any) {
    this.selectedShelter = shelter; // Зберігаємо вибраний притулок
  }


  Volonter() {
    const volonterData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNumber: this.contactNumber,
      shelter: this.shelter
    };
    // const token = localStorage.getItem('token');
    //
    // // Перевіряємо, чи є токен
    // if (!token) {
    //   console.error('Token not found');
    //   return;
    // }
    //
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('https://springmvcapp.onrender.com/api/forms/volunteer', volonterData).subscribe({
      next: (response) => {
        this.successMessage = 'Форма успішно відправлена!';
        this.errorMessage = null;
        console.log('Форма успішно відправлена', response);
        this.clearForm();
        this.clearMessagesAfterDelay();
      },
      error: (error) => {
        this.errorMessage = 'Сталася помилка під час відправлення форми.';
        this.successMessage = null;
        console.error('Сталася помилка', error);
        this.clearMessagesAfterDelay();
      }
    });
  }

  clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.contactNumber = '';
    this.shelter = '';
  }

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, 5000); // Повідомлення зникнуть через 5 секунд
  }
}
