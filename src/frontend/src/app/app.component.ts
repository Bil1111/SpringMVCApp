import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';

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

  title = 'FF';
  isHomePage: boolean = false;
  mapPoints: MapPoint[] = [];

  public isLogged: boolean = false;
  ShowFooter: boolean = false;
  ShowHeader: boolean = true;

  fact: string = '';
  chatDuckDuckgo: boolean = false;
  userInput: string = '';
  responses: { query: string, answer: string }[] = [];


  constructor(private router: Router, private http: HttpClient, private sharedService: SharedService) {
    this.router.events.subscribe(() => {
      this.ShowFooter = this.router.url !== '/adopt' && this.router.url !== '/gifthouse' && this.router.url !== '/free-people'
        && this.router.url !== '/admin' && this.router.url !== '/admin/shelteradmin' && this.router.url !== '/admin/usersadmin' && this.router.url !== '/admin/volonteradmin'
        && this.router.url !== '/admin/adopradmin' && this.router.url !== '/admin/wardadmin'
        && this.router.url !== '/admin/blogadmin' && this.router.url !== '/admin/tabel-animals';

      this.ShowHeader = this.router.url !== '/admin' && this.router.url !== '/admin/shelteradmin'
        && this.router.url !== '/admin/usersadmin' && this.router.url !== '/admin/volonteradmin'
        && this.router.url !== '/admin/adopradmin' && this.router.url !== '/admin/wardadmin'
        && this.router.url !== '/admin/blogadmin' && this.router.url !== '/admin/tabel-animals'
        && this.router.url !== '/admin/statistics';

    })
    this.sharedService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
      if (this.isHomePage) {
        this.loadMapPoints();
      }
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
      center: {lat: 50.4501, lng: 30.5234}, // Центр карти - Київ
    });

    this.mapPoints.forEach(point => {
      const marker = new google.maps.Marker({
        position: {lat: point.latitude, lng: point.longitude}, // Використовуємо latitude та longitude
        map: map,
        title: point.name,
      });

      // Створення інфо-вікна для мітки
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div  style="
          max-width: 400px;
          margin: 0px;
          padding: 0px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">

            <img src="${point.imageURL}" alt="${point.name}" style="width:100%; height:auto; object-fit: cover; border-radius: 5px; ">
           <a id="shelter-link" href="/for-all-shelter?shelterName=${point.name}&shelterId=${point.id}" style="font-size: 2.3em;  text-decoration: none;  display: flex;  justify-content: start; font-family: 'e-ukrB'; color: black; ">${point.name}</a>
            <p style=" margin-top: 10px; font-size: 1.1rem"  font-family: 'e-ukr'>  <strong>Місто:</strong> ${point.city}</p>
            <p style="font-size: 1.1rem" font-family: 'e-ukr' ><strong>Адреса:</strong> ${point.address}</p>
            <p style="font-size: 1.1rem"  font-family: 'e-ukr'><strong>Телефон:</strong> ${point.contactNumber}</p>
            <p style="font-size: 1.1rem"  font-family: 'e-ukrB';><strong>Опис:</strong> ${point.description}</p>

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

  closeMenu() {
    this.visible = false;
  }

  Openmemu() {
    this.visible = true;
  }


  logout() {
    localStorage.removeItem('token');
    this.sharedService.changeLoginState(false);
  }

  getFact() {
    this.http.get<{ fact: string }>('http://localhost:8080/api/fact').subscribe({
      next: (data) => (this.fact = data.fact),
      error: (err) => console.error('Помилка отримання факту:', err),
    });
  }

  show_chat() {
    this.chatDuckDuckgo = !this.chatDuckDuckgo;
  }

  search() {
    console.log('Запит на пошук:', this.userInput);  // Лог для початку пошуку
    this.http.get<any>(`http://localhost:8080/duckduckgo/search?query=${this.userInput}`).subscribe(
      response => {
        console.log('Отримана відповідь:', response);  // Лог для відповіді
        const answerText = response.answer;  // Витягти відповідь з об'єкта
        this.responses.push({query: this.userInput, answer: answerText});  // Додаємо відповідь до списку
        this.userInput = '';
        console.log('Пошук завершено. Відповідь додано до списку.');  // Лог після додавання відповіді
      },
      (error) => {
        console.error('Помилка запиту:', error);  // Лог для помилки
      }
    );
  }


}
