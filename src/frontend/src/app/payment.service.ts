import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://springmvcapp.onrender.com/pay'; // Твій бекенд

  constructor(private http: HttpClient) {}

  getPaymentForm(amount: number, description: string): Observable<string> {
    let params = new HttpParams()
      .set('amount', amount.toString())
      .set('description', description);

    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }
}
