import {Component, OnInit, HostListener} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-find-f',
  templateUrl: './find-f.component.html',
  styleUrls: ['./find-f.component.css']
})
export class FindFComponent implements OnInit {

  isScrollToTopVisible: boolean = false;
  isModalOpen: boolean = false;
  private lastScrollTop: number = 0;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Показуємо кнопку, якщо користувач прокрутив вниз
    if (scrollTop > this.lastScrollTop && scrollTop > 300) {
      this.isScrollToTopVisible = true;
    } else if (scrollTop < 100) {
      this.isScrollToTopVisible = false;
    }

    this.lastScrollTop = scrollTop;

    // Якщо відкрите модальне вікно, приховуємо кнопку
    if (this.isModalOpen) {
      this.isScrollToTopVisible = false;
    }
  }

  scrollToTop() {
    window.scrollTo({top: 0,});
  }

  filteredAnimals: any[] = [];
  shelters: any[] = [];
  animals: any[] = [];
  AllAnimals: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 11;
  selectedAnimal: any = null; // Для зберігання вибраної тварини
  isAdoptFormOpen: any = null;
  isWardFormOpen: any = null;
  shelter:  string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contactNumber: string = '';
  experience: string = '';

  errorMessage: string | null = null;
  successMessage: string | null = null;
  //ТВАРИНКА
  animalName: string = '';
  animalAge: string = '';
  animalSex: string = '';
  animalSize: string = '';
  imageURL: string='';
  typeOfAnimal: string = '';
  ID_shelter: string ='';
  Shelter: string = '';
  City: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchAnimals(this.currentPage);
  }

  fetchAnimals(page: number) {
    const startId = (page - 1) * this.itemsPerPage;

    // Запит на отримання всіх притулків
    this.http.get<any[]>('https://springmvcapp.onrender.com/api/shelters').subscribe(
      shelters => {
        const allAnimals: any[] = [];

        // Обробка кожного притулку
        shelters.forEach(shelter => {
          if (shelter.animals) {
            const animalsWithShelterName = shelter.animals.map((animal: any) => ({
              ...animal, // Копіювання всіх властивостей об'єкта
              shelterId: shelter.id, // Додаємо назву притулку до кожної тварини
            }));
            allAnimals.push(...animalsWithShelterName); // Додаємо до загального списку
          }
        });

        // Пагінація: вибираємо тварин для поточної сторінки
        this.animals = allAnimals.slice(startId, startId + this.itemsPerPage);
        this.AllAnimals = [...allAnimals]; // Зберігаємо копію для подальшої фільтрації чи обробки

        this.applyFilters(); // Застосовуємо фільтри при переході на нову сторінку

        // Обчислюємо кількість сторінок
        this.totalPages = Math.ceil(allAnimals.length / this.itemsPerPage);
        console.log('Total pages:', this.totalPages);

      },
      error => console.error('Error fetching shelter data:', error)
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchAnimals(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAnimals(this.currentPage);
    }
  }

  // Метод для вибору тварини
  selectAnimal(animal: any) {
    this.selectedAnimal = animal; // Зберігаємо вибрану тварину
    this.isAdoptFormOpen = null;
    this.isWardFormOpen = null;
    this.isModalOpen = true;
    this.isScrollToTopVisible = false; // Ховаємо кнопку
  }

  openAdoptForm() {
    this.isAdoptFormOpen = this.selectedAnimal;
    this.animalName = this.selectedAnimal.name || 'empty';
    this.animalAge = this.selectedAnimal.age || 'empty';
    this.animalSex = this.selectedAnimal.sex || 'empty';
    this.animalSize = this.selectedAnimal.size || 'empty';
    this.typeOfAnimal = this.selectedAnimal.type || 'empty';
    this.ID_shelter = this.selectedAnimal.shelterId || 'empty';
    this.isModalOpen = true;
    this.isScrollToTopVisible = false; // Ховаємо кнопку
    // this.Shelter = this.selectedAnimal.shelterName || 'empty';
    // this.City = this.selectedAnimal.city || 'empty';
  }

  openWardForm() {
    this.isWardFormOpen = this.selectedAnimal;
    this.animalName = this.selectedAnimal.name || 'empty';
    this.animalAge = this.selectedAnimal.age || 'empty';
    this.animalSex = this.selectedAnimal.sex || 'empty';
    this.animalSize = this.selectedAnimal.size || 'empty';
    this.typeOfAnimal = this.selectedAnimal.type || 'empty';
    this.ID_shelter = this.selectedAnimal.shelterId || 'empty';
    this.isModalOpen = true;
    this.isScrollToTopVisible = false; // Ховаємо кнопку
    // this.Shelter = this.selectedAnimal.shelterName || 'empty';
    // this.City = this.selectedAnimal.city || 'empty';
  }

  // Метод для закриття модального вікна
  closeModal() {
    this.selectedAnimal = null; // Скидаємо вибрану тварину
    this.isModalOpen = false;
    this.onWindowScroll();
  }

  closeAdoptForm() {
    this.isAdoptFormOpen = null;
    this.clearForm();
    this.isModalOpen = false;
    this.onWindowScroll();
  }

  closeWardForm() {
    this.isWardFormOpen = null;
    this.clearForm();
    this.isModalOpen = false;
    this.onWindowScroll();
  }

  // Змінні для фільтрів
  activeFilters: any = {
    type: [],
    sex: [],
    age: [],
    city: [],
    vaccinated: [],
    sterilized: [],
    specialCare: []
  };

  toggleFilter(filterType: string, value: string | number | boolean) {
    const filterArray = this.activeFilters[filterType]; // Це масив, в якому зберігаються значення для вибраного фільтра.
    const index = filterArray.indexOf(value);
    if (value === '' || value === 0 || value === false)  {
      this.activeFilters[filterType] = [];
    }

    if (index > -1) {
      filterArray.splice(index, 1);// видаляє за допомогою методу splice.
    } else {
      filterArray.push(value); //додає його до масиву фільтрів
    }
    this.applyFilters(); // застосування нових фільтрів до колекції тварин.
    setTimeout(() => {}, 0);
  }


  applyFilters() {
    this.filteredAnimals  = this.AllAnimals.filter(animal => {
      return (
        this.isMatchingFilter(animal, 'type', this.activeFilters.type) &&
        this.isMatchingFilter(animal, 'sex', this.activeFilters.sex) &&
        this.isMatchingFilter(animal, 'age', this.activeFilters.age) &&
        this.isMatchingFilter(animal, 'city', this.activeFilters.city) &&
        this.isMatchingFilter(animal, 'vaccinated', this.activeFilters.vaccinated) &&
        this.isMatchingFilter(animal, 'sterilized', this.activeFilters.sterilized) &&
        this.isMatchingFilter(animal, 'specialCare', this.activeFilters.specialCare)
      );
    });
    this.animals = this.filteredAnimals.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalPages = Math.ceil(this.filteredAnimals.length / this.itemsPerPage);

  }

  isMatchingFilter(animal: any, filterType: string, activeValues: any[]): boolean {
    if (activeValues.length === 0 || activeValues.includes('')) {
      return true; // Якщо фільтр не активний, всі значення проходять
    }
    // if (filterType === 'type' && activeValues.includes('') || filterType === 'sex' && activeValues.includes('')
    //    || filterType === 'age' && activeValues.includes(0) || filterType === 'city' && activeValues.includes('')) {
    //   return true; // Вік "Усі" повинен проходити
    // }

    if (filterType === 'age') {
      const ageRanges: { [key: number]: (age: number) => boolean } = {
        1: (age) => age <= 1,
        2: (age) => age >= 1 && age <= 2,
        3: (age) => age >= 2 && age <= 5,
        4: (age) => age > 5,
      };

      return activeValues.some(value => ageRanges[value]?.(animal.age));
    }
    if (typeof animal[filterType] === 'boolean') {
      return activeValues.includes(animal[filterType]);
    }
    return activeValues.includes(animal[filterType]);
  }


  // ФОРМА ДЛЯ УСИНОВЛЕННЯ
  ModalAdopt() {
    const AdoptData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNumber: this.contactNumber,
      experience: this.experience,
      typeOfAnimal: this.typeOfAnimal,
      shelter: this.ID_shelter,
      animalName: this.animalName,
      animalAge: this.animalAge,
      animalSex: this.animalSex,
      animalSize: this.animalSize,
    };
    console.log('Дані форми:', AdoptData);
    // const token = localStorage.getItem('token');
    //
    // // Перевіряємо, чи є токен
    // if (!token) {
    //   console.error('Token not found');
    //   return;
    // }
    //
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('https://springmvcapp.onrender.com/api/forms/adopt', AdoptData).subscribe({
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

  // ФОРМА ДЛЯ ОПІКИ
  ModalWard() {
    const WardData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNumber: this.contactNumber,
      experience: this.experience,
      typeOfAnimal: this.typeOfAnimal,
      shelter: this.ID_shelter,

      animalName: this.animalName,
      animalAge: this.animalAge,
      animalSex: this.animalSex,
      animalSize: this.animalSize,

      // Shelter: this.Shelter,
      // City: this.City,
    };

    this.http.post('https://springmvcapp.onrender.com/api/forms/ward', WardData).subscribe({
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
    this.typeOfAnimal = '';
    this.experience = '';
    this.ID_shelter = '';
  }

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, 5000); // Повідомлення зникне через 5 секунд
  }

}
