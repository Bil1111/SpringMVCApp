import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAndRegestService } from '../login-and-regest.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isScrollToTopVisible: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginAdnRegestService: LoginAndRegestService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log("🔥 Компонент About завантажено!");
    console.log("📍 Поточний URL:", window.location.href);

    // ✅ Перевіряємо, чи є токен у LocalStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log("🔄 Токен знайдено у LocalStorage, авторизація...");
      this.loginAdnRegestService.changeLoginState(true);
      this.isLoggedIn = true;
    } else {
      // ✅ Отримуємо queryParams тільки ОДИН раз
      this.route.queryParams.subscribe(params => {
        console.log("🔍 Отримані queryParams:", params);

        if (params['token']) {
          console.log("✅ Токен знайдено в URL:", params['token']);

          // ✅ Зберігаємо токен у LocalStorage
          localStorage.setItem('token', params['token']);

          // ✅ Оновлюємо статус авторизації
          this.loginAdnRegestService.changeLoginState(true);
          this.isLoggedIn = true;

          // ✅ Видаляємо токен з URL та оновлюємо сторінку
          this.router.navigate([], { queryParams: {}, replaceUrl: true }).then(() => {
            location.reload(); // 🔄 Оновлення сторінки
          });
        } else {
          console.warn("❌ Токен відсутній у URL");
        }
      });
    }

    // ✅ Слухаємо зміни авторизації
    this.loginAdnRegestService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollToTopVisible = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
