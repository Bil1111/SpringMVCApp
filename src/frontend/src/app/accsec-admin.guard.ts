import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, first } from 'rxjs';

export const accsecAdminGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  const Storedtoken = localStorage.getItem('token');

  if (!Storedtoken) {
    router.navigate(['/sing-in']);
    console.log('ВІДСУТНІЙ КЛЮЧ');
    return false;
  }
  return http.get<any[]>('https://springmvcapp.onrender.com/api/users').pipe(
    map(users => {
      const user = users.find(u => u.authToken === Storedtoken && u.role === 'ADMIN');
      if (user) {
        console.log('ДОЗВІЛ');
        return true;
      } else {
        console.log('ВІДМОВА');
        router.navigate(['/about']);
        return false;
      }
    }),
    first()
  );
};
