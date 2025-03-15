import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import {LoginAndRegestService} from './login-and-regest.service';
declare const google: any;

interface MapPoint {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  description: string;
  city: string;
  latitude: number;
  longitude: number;
  imageURL: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  fact: string = '';

  title = 'FF';
  isHomePage: boolean = false;
  mapPoints: MapPoint[] = [];

   public isLogged: boolean = false;
   ShowFooter: boolean = false;
   ShowHeader: boolean = true;


  constructor(private router: Router, private http: HttpClient,private route: ActivatedRoute,private loginAdnRegestService: LoginAndRegestService,private sharedService: SharedService) {
    this.router.events.subscribe(() => {
      this.getFact();

      this.ShowFooter = this.router.url !== '/adopt' &&  this.router.url !== '/gifthouse' &&  this.router.url !== '/free-people'
      &&  this.router.url !== '/admin' &&  this.router.url !== '/admin/shelteradmin' &&  this.router.url !== '/admin/usersadmin' &&  this.router.url !== '/admin/volonteradmin'
      &&  this.router.url !== '/admin/adopradmin' &&  this.router.url !== '/admin/wardadmin'
      &&  this.router.url !== '/admin/blogadmin'   &&  this.router.url !== '/admin/tabel-animals';

      this.ShowHeader = this.router.url !== '/admin' &&  this.router.url !== '/admin/shelteradmin'
      &&  this.router.url !== '/admin/usersadmin' &&  this.router.url !== '/admin/volonteradmin'
      &&  this.router.url !== '/admin/adopradmin' &&  this.router.url !== '/admin/wardadmin'
      &&  this.router.url !== '/admin/blogadmin'  &&  this.router.url !== '/admin/tabel-animals'
      && this.router.url !== '/admin/statistics';

    })
    this.sharedService.isLoggedIn$.subscribe(isLoggedIn =>{
      this.isLogged = isLoggedIn;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        console.log("✅ Токен знайдено в URL:", token);
        localStorage.setItem('token', token);
        this.sharedService.changeLoginState(true);

        // Видаляємо токен з URL і переходимо на головну
        this.router.navigate(['/']);
      } else {
        // Якщо токен вже є в localStorage, просто змінюємо стан
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          this.sharedService.changeLoginState(true);
        }
      }
    });

    // Перевіряємо, чи користувач на головній сторінці, і завантажуємо мапу
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
      if (this.isHomePage) {
        this.loadMapPoints();
      }
    });
  }

  getFact() {
    this.http.get<{ fact: string }>('http://localhost:8080/api/fact').subscribe({
      next: (data) => (this.fact = data.fact),
      error: (err) => console.error('Помилка отримання факту:', err),
    });
  }

  loadMapPoints() {
    this.http.get<MapPoint[]>('http://localhost:8080/api/mapPoints')
      .subscribe(data => {
        this.mapPoints = data;
        this.initMap();
      });
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 10,
      center: { lat: 50.4501, lng: 30.5234 }, // Центр карти - Київ
    });

    this.mapPoints.forEach(point => {
      const marker = new google.maps.Marker({
        position: { lat: point.latitude, lng: point.longitude }, // Використовуємо latitude та longitude
        map: map,
        title: point.name,
      });

      // Створення інфо-вікна для мітки
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div  style="font-family: 'e-ukr' max-width: 300px; padding: 10px; margin: 0;border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);" >
           <a id="shelter-link" href="/for-all-shelter?shelterName=${point.name}&shelterId=${point.id}" style="font-size: 2.3em;font-weight: bold;text-decoration: none;  display: flex;  justify-content: center;
             color: black; ">${point.name}</a>
            <p style=" margin-top: 10px; font-size: 1.1rem">  <strong>Місто:</strong> ${point.city}</p>
            <p style="font-size: 1.1rem" ><strong>Адреса:</strong> ${point.address}</p>
            <p style="font-size: 1.1rem"><strong>Телефон:</strong> ${point.contactNumber}</p>
            <p style="font-size: 1.1rem"><strong>Опис:</strong> ${point.description}</p>
            <img src="${point.imageURL}" alt="${point.name}" style="width:100px; height:auto; object-fit: cover;  ">
          </div>
        `,
      });

      // Обробник події для відкриття інфо-вікна
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

    });


  }

  visible = false;
  closeMenu(){this.visible = false;}
  Openmemu(){this.visible = true;}


  logout(){
    localStorage.removeItem('token');
    this.sharedService.changeLoginState(false);
    this.router.navigate(["/sing-in"]);
   }
}
