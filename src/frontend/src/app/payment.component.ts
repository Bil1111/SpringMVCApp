import { Component } from '@angular/core';
import { PaymentService } from './payment.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: SafeHtml = ''; // SafeHtml для безпечного HTML

  constructor(private paymentService: PaymentService, private sanitizer: DomSanitizer) {}

  pay() {
    this.paymentService.getPaymentForm(100, 'Підписка').subscribe(response => {
      this.paymentForm = this.sanitizer.bypassSecurityTrustHtml(response); // Дозволяємо вставку HTML
      setTimeout(() => {
        const form = document.getElementById('liqpay-form') as HTMLFormElement;
        if (form) {
          form.submit(); // Автоматично відправляємо форму
        } else {
          console.error('Форма не знайдена');
        }
      }, 100);
    }, error => {
      console.error('Помилка запиту:', error);
    });
  }
}
