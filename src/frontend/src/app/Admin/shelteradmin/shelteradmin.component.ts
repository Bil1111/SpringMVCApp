import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shelteradmin',
  templateUrl: './shelteradmin.component.html',
  styleUrl: './shelteradmin.component.css'
})
export class ShelteradminComponent {
 Shelters: any[] = [];
 selectedShelter: any = null; // Для зберігання вибраного притулку
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
 latitude: string = '';
 longitude: string = '';
 // МОДАЛЬНЕ ВІКНО ДЛЯ ДОдавання  ПРИТУЛКА
//  name: string = '';
//  city: string = '';
//  address: string = '';
//  contactNumber: string = '';
 description: string ='';
 // МОДАЛЬНЕ ВІКНО ДЛЯ ПОШУКУ
 search_data_id: any = {id:''};
 search_data_name: any = {name:''};
 search_data_city: any = {city:''};
 search_data_address: any = {address:''};
 search_data_contactNumber: any = {contactNumber:''};
// МОДАЛЬНЕ ВІКНО ДЛЯ ВИДАЛЕННЯ
 id_for_delete: string = '';
// МОДАЛЬНЕ ВІКНО ДЛЯ ДОДАВАННЯ ТВАРИНКИ ДО ПРИТУЛКУ
id_animals: string = '';
age_animals: string = '';
name_animals: string = '';
descript_animals: string = '';
sex_animals: string = '';
size_animals: string = '';
type_animals: string = '';
url_animals: string ='';
city_animals: string = '';
contactshelter_animals: string = '';

vaccinated: boolean = false;
steril: boolean = false;
specialCare: boolean = false;

emailShelter: string = '';
card: string = '';
PayPal: string = '';
IBAN: string = '';




constructor(private http: HttpClient) { }

ngOnInit() {
  this.SherlterForAdmin();
}

SherlterForAdmin() {
  this.http.get<any[]>('https://springmvcapp.onrender.com/api/shelters').subscribe(
    data => {
      this.Shelters = data.map(shelter => {

        return shelter;});
    },
    error => {
      console.error('Error fetching shelters:', error); // Логування помилки
    }
  );
}

selectShelter(shelter: any){
  this.selectedShelter = shelter;
  this.id = shelter.id;
  this.name = shelter.name;
  this.city = shelter.city;
  this.address = shelter.address;
  this.contactNumber = shelter.contactNumber;
  this.description = shelter.description;
  this.latitude = shelter.latitude;
  this.longitude = shelter.longitude;
  this.imageurl=shelter.imageURL;
  this.emailShelter = shelter.email;
  this.card = shelter.card;
  this.PayPal = shelter.paypal;
  this.IBAN = shelter.iban;

}

selectShelter_froanimals(shelters: any){
  this.selectedShelter_For_Add_Animals = shelters;
  this.id = shelters.id;
  this.city_animals = shelters.city;
  this.contactshelter_animals = shelters.contactNumber;

}
closeFor_Add_Animals(){this.selectedShelter_For_Add_Animals = null;}

closeModal() {this.selectedShelter = null;
  this.name = '';
  this.city = '';
  this.address = '';
  this.contactNumber = '';
  this.description = '';
  this.latitude = '';
  this.longitude = '';
  this.imageurl='';
  this.emailShelter ='';
  this.card = '';
  this.PayPal ='';
  this.IBAN = '';
}
close(){this.selectedShelterForadd = false;
  this.name = '';
  this.city = '';
  this.address = '';
  this.contactNumber = '';
  this.description = '';
  this.imageurl = '';
  this.latitude = '';
  this.longitude = '';
  this.imageurl='';
  this.emailShelter ='';
  this.card = '';
  this.PayPal ='';
  this.IBAN = '';}

SendEditedShelter(){
  const EditShelter = {
     id: this.id,
     name: this.name,
     city: this.city,
     address: this.address,
     contactNumber: this.contactNumber,
     description:  this.description,
     latitude:  this.latitude,
     longitude:  this.longitude,
     imageURL: this.imageurl,
     email:  this.emailShelter,
     card:  this.card,
     paypal:  this.PayPal,
     iban:  this.IBAN

  };
  console.log(EditShelter);
  this.http.put(`https://springmvcapp.onrender.com/api/shelters/update/${EditShelter.id}`,EditShelter, { responseType: 'text' }).subscribe(
   {next: (response) => {
    console.log('Притулок оновлено успішно', response);
    this.closeModal();
    this.SherlterForAdmin();
  },
  error: (error) => {
    console.error('Помилка при оновленні притулку', error);

  }})
}

OpenAddForm(){this.selectedShelterForadd = true;}
AddShelter(){
  const AddShelterData = {
    //  id: this.id,
     name: this.name,
     city: this.city,
     address: this.address,
     contactNumber: this.contactNumber,
     description: this.description,
     imageURL: this.imageurl,
     latitude: this.latitude,
     longitude:this.longitude,
     email:  this.emailShelter,
     card:  this.card,
     paypal:  this.PayPal,
     iban:  this.IBAN
  };
     this.http.post('https://springmvcapp.onrender.com/api/shelters/add', AddShelterData ,{responseType : ('text')}).subscribe(
      {next: (response) => {
      console.log(response);
      this.close();
      this.SherlterForAdmin();


    },
    error: (error) => {
      console.error('Помилка при додавані притулку', error);

    }});

}

OpenSearchForm(){this.searchInfo = true;}
closeSearch(){this.searchInfo =false;}
CleanSearchForm(){
  this.search_data_id.id = '';
  this.search_data_id.name = '';
  this.search_data_id.city = '';
  this.search_data_id.address = '';
  this.search_data_id.contactNumber = '';
}
CleanDeleteForm(){
  this.id_for_delete = '';

}
OpeneDelete(){this.DELETE = true;}
closeModalDelete(){this.DELETE = false; this.CleanDeleteForm(); }
confirmDelete(){
  const confirmation = confirm('Ви впевнені, що хочете видалити цей притулок?');
  if(confirmation){
   const confirmsecond = confirm('Дані притулку будуть видалені без можливості відновити.')
   if(confirmsecond){
    this.seandDelete();
   }
  }
}
seandDelete(){

  this.http.delete<any[]>(`https://springmvcapp.onrender.com/api/shelters/${this.id_for_delete}` , {responseType: ('text' as 'json')}).subscribe(
 {next: (response) => {
  console.log(response);
  this.closeModalDelete();

  this.SherlterForAdmin();
},
error: (error) => {
  console.error('Помилка при видаленні притулку', error);

}})
}

Aniamls(){
  const SendDataAboutAnimals ={
    id: this.id_animals,
    name: this.name_animals,
    type: this.type_animals,
    age: this.age_animals,
    size: this.size_animals,
    description: this.descript_animals,
    sex: this.sex_animals,
    imageURL: this.url_animals,
    city: this.city_animals,
    shelterPhoneNumber: this.contactshelter_animals,
    shelter: this.id,
    vaccinated: this.vaccinated,
    sterilized: this.steril,
    specialCare: this.specialCare

  };

  this.http.post<any[]>(`https://springmvcapp.onrender.com/api/animals/add`,SendDataAboutAnimals ,{responseType: ('text' as 'json')} ).subscribe(
    {next: (response) => {
      console.log(response);
      this.closeFor_Add_Animals();
      this.SherlterForAdmin();
    },
    error: (error) => {
      console.error('Помилка при додаванні тваринки до притулку', error);

    }}
  )

}

}
