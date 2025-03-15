import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginAndRegestService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
   isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor() {
    this.checkLoginStatus();
  }

  changeLoginState(value: boolean) {
    this.isLoggedInSubject.next(value);  // Оновлює стан логіну
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }
}
