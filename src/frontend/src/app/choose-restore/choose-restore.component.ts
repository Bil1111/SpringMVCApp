import { Component } from '@angular/core';
import { DaltonizmService } from '../daltonizm.service';

@Component({
  selector: 'app-choose-restore',
  templateUrl: './choose-restore.component.html',
  styleUrl: './choose-restore.component.css'
})
export class ChooseRestoreComponent {

  selectedClass: any = {};

  constructor(private daltonizmService : DaltonizmService){}

  ngOnInit(): void {
    this.daltonizmService.selectedClass$.subscribe( selectedClass =>{
      this.selectedClass = selectedClass;
    });
  }
}
