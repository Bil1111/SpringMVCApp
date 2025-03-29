import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabel-animals',
  templateUrl: './tabel-animals.component.html',
  styleUrl: './tabel-animals.component.css'
})
export class TabelAnimalsComponent {
 All_Animals: any[] = [];
 selectedAnimal: any = null; // Для зберігання вибраного притулку
 selectedShelter_For_Add_Animals: any = null;
 selectedShelterForadd: boolean = false;
 DELETE: boolean = false;
 searchInfo: boolean = false;
//  deleteSearch: boolean = false;

 // МОДАЛЬНЕ ВІКНО ДЛЯ ПРИТУЛКА
  id: string = '';
 name: string = '';
 city: string = '';
 address: string = '';
 contactNumber: string = '';
 imageurl: string = '';
 age: string = '';
 descript: string = '';
 size: string = '';
 idsgelter: string = '';
 vaccinated: boolean = false;
 steril: boolean = false;
 specialCare: boolean = false;


 // МОДАЛЬНЕ ВІКНО ДЛЯ ПОШУКУ
 search_data_id: any = {id:''};
 search_data_name: any = {name:''};
 search_data_city: any = {city:''};
 search_data_age: any = {age:''};
 search_data_sex: any = {sex:''};
 search_data_size: any = {size:''};
 search_data_type: any = {type:''};
 search_data_shelterName: any ={shelterName: ''};

 id_for_delete: string = '';



constructor(private http: HttpClient) { }

ngOnInit() {
  this.SherlterForAdmin();
}

SherlterForAdmin() {
    this.http.get<any[]>('https://springmvcapp.onrender.com/api/shelters') // Отримуємо всі притулки
      .subscribe(
        shelters => {
          shelters.forEach(shelter => {
            if (shelter.animals) {
              const animalsWithShelterName = shelter.animals.map((animal: any) => ({
                ...animal, // копіювання всіх властивостей об'єкта
                shelterName: shelter.name, // Додаємо назву притулку до кожної тварини
                shelterid: shelter.id, // Додаємо назву притулку до кожної тварин
              }));

              this.All_Animals.push(...animalsWithShelterName); // Додаємо до загального списку
            }
          });
          // this.Shelters = [...this.animals]; // Зберігаємо копію для подальшої фільтрації чи обробки
        },
        error => console.error('Error fetching shelter data:', error)
      );
}

selectShelter(shelter: any){
  this.selectedAnimal = shelter;
  this.id = shelter.id;
  this.name = shelter.name;
  this.city = shelter.city;
  this.age = shelter.age;
  this.descript = shelter.description;
  this.size = shelter.size;
  this.idsgelter = shelter.shelterid;
  this.imageurl=shelter.imageURL;
  this.vaccinated = Boolean(shelter.vaccinated);
  this.steril = Boolean(shelter.sterilized);
  this.specialCare = Boolean(shelter.specialCare);
}


closeFor_Add_Animals(){this.selectedShelter_For_Add_Animals = null;}
closeModal() {this.selectedAnimal = null; }


SendEditedAnimal(){
  console.log('Vaccinated:', this.vaccinated);
  console.log('Sterilized:', this.steril);
  console.log('SpecialCare:', this.specialCare);

  const EditAnimal = {

      id: this.id,
      name: this.name,
      city: this.city,
      age: this.age,
      description: this.descript,
      size: this.size,
      imageURL: this.imageurl,
      shelter: this.idsgelter,
      vaccinated: Boolean(this.vaccinated),
      sterilized: Boolean(this.steril),
      specialCare: Boolean(this.specialCare)
  };
  console.log(EditAnimal);

  this.http.put(`https://springmvcapp.onrender.com/api/animals/update/${this.id}`,EditAnimal, {responseType: ('text' )}).subscribe(
   {next: (response) => {
    console.log("Сервер відповів:", response);
    this.closeModal();
    this.All_Animals = [];
    this.SherlterForAdmin();
  },
  error: (error) => {
    console.error('Помилка при оновленні притулку', error);
  }})
}

OpenAddForm(){this.selectedShelterForadd = true;}


OpenSearchForm(){this.searchInfo = true;}
closeSearch(){this.searchInfo =false;}
CleanSearchForm(){
  this.search_data_id.id = '';
  this.search_data_id.name = '';
  this.search_data_id.city = '';
  this.search_data_id.age = '';
  this.search_data_id.sex = '';
  this.search_data_id.size = '';
  this.search_data_id.type= '';
  this.search_data_id.shelterName = '';
}
CleanDeleteForm(){
  this.id_for_delete = '';
}
OpeneDelete(){this.DELETE = true;}
closeModalDelete(){this.DELETE = false; this.CleanDeleteForm()}
confirmDelete(){
  const confirmation = confirm('Ви впевнені, що хочете видалити цю тваринку?');
  if(confirmation){
   const confirmsecond = confirm('Дані про тваринку будуть видалені без можливості відновити.')
   if(confirmsecond){
    this.seandDelete();
   }
  }
}
seandDelete(){

  this.http.delete<any[]>(`https://springmvcapp.onrender.com/api/animals/${this.id_for_delete}` , {responseType: ('text' as 'json')}).subscribe(
 {next: (response) => {
  console.log(response);
  this.closeModalDelete();
  this.All_Animals = [];
  this.SherlterForAdmin();
},
error: (error) => {
  console.error('Помилка при видаленні притулку', error);

}})
}


}
