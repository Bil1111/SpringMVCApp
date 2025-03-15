import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaltonizmService {

  constructor() { }

  private SelectedClassSubject = new BehaviorSubject<any>({});
  selectedClass$ = this.SelectedClassSubject.asObservable();

  changeClass(className: any):void{
      this.SelectedClassSubject.next(className);
  }
}
