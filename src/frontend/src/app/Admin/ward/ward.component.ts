import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrl: './ward.component.css'
})
export class WardComponent {
 Volonter: any [] = [];
  searchInfo: boolean = false;
  selectedVolonter: any = null;

  Id: number = 0;
  email: string = '';
  contactnumber: string = '';
  name: string = '';
  surname: string = '';
  shelter: string = '';

  search_data_id: any = {id:''};
  search_user_firstName: any = {firstName:''};
  search_user_lastName: any = {lastName:''};
  search_user_contactNumber: any = {contactNumber:''};
  search_user_email: any = {email:''};
  search_user_typeOfAnimal: any = {typeOfAnimal:''};
  search_user_animalName: any = {animalName:''};
  search_user_animalAge: any = {animalAge:''};
  search_user_animalSex: any = {animalSex:''};
  search_user_animalSize: any = {animalSize:''};
  search_user_experience: any = {experience:''};
  search_user_shelterName: any = {shelterName:''};

  DELETE: boolean = false;
  id_for_delete: string = '';
  constructor(private http : HttpClient){}
  ngOnInit(){
    this.AllUsers();
  }

  AllUsers(){
    this.http.get<any[]>('https://springmvcapp.onrender.com/api/forms/ward/all').subscribe(
      data =>{this.Volonter = data.map( volonter => { return volonter;});},
       error =>{console.error('Error fetching shelters:', error);});
  }

  OpenSearchForm(){this.searchInfo = true;}
  closeSearch(){this.searchInfo =false;}
  CleanSearchForm(){
    this.search_data_id.id = '';
    this.search_data_id.firstName = '';
    this.search_data_id.lastName = '';
    this.search_data_id.contactNumber = '';
    this.search_data_id.email = '';
    this.search_data_id.typeOfAnimal = '';
    this.search_data_id.animalName = '';
    this.search_data_id.animalAge = '';
    this.search_data_id.animalSex = '';
    this.search_data_id.animalSize = '';
    this.search_data_id.experience = '';
    this.search_data_id.shelterName = '';
  }

  // selectUser(volonter:any){
  //  this.selectedVolonter = volonter;

  //  this.Id = volonter.id;
  //  this.email = volonter.email;
  //  this.contactnumber = volonter.contactNumber;
  //  this.name = volonter.firstName;
  //  this.surname = volonter.lastName;

  // }
  closeModal(){this.selectedVolonter = null;}

  // SendEditedUser(){

  //   const DataVolonter = {
  //     id: this.Id,
  //     email:  this.email,
  //     contactNumber: this.contactnumber,
  //     firstName: this.name,
  //     lastName:  this.surname
  //   };

  //   this.http.put<any[]>(`https://springmvcapp.onrender.com/api/forms/volunteer` , DataVolonter , {responseType: 'text' as 'json'}).subscribe(
  //   {next: (response) => {
  //     // console.log(response);
  //     this.closeModal();
  //     this.AllUsers();
  //   },
  //   error: (error) => {
  //     console.error('Помилка при оновленні користувача', error);

  //   }})
  // }
  CleanDeleteForm(){
    this.id_for_delete = '';
  }
  OpeneDelete(){this.DELETE = true;}
  closeModalDelete(){this.DELETE = false; this.CleanDeleteForm();}
  confirmDelete(){
    const confirmation = confirm('Ви впевнені, що хочете видалити заявку на опіку?');
    if(confirmation){
     const confirmsecond = confirm('Дані про заявку будуть видалені без можливості відновити.')
     if(confirmsecond){
      this.seandDelete();
     }
    }
  }
  seandDelete(){

    this.http.delete<any[]>(`https://springmvcapp.onrender.com/api/forms/ward/${this.id_for_delete}` , {responseType: ('text' as 'json')}).subscribe(
   {next: (response) => {
    console.log(response);
    this.closeModalDelete();
    this.AllUsers();
    this.id_for_delete = '';
  },
  error: (error) => {
    console.error('Помилка при видаленні', error);

  }})
  }
}
