import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


  

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor() {
    this.checkLoginStatus();
  }

  changeLoginState(value: boolean) {
    this.isLoggedInSubject.next(value);  // Оновлює стан логіну
  }

  // private getLoginStateFromLocalStorage(): boolean {
  //   const savedState = localStorage.getItem('isLoggedIn');
  //   return savedState ? JSON.parse(savedState) : false;
  // }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }


 
}
