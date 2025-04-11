import { Component, Input } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { Router } from '@angular/router';

@Component({
  selector: 'house-card',
  imports: [],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  // I need to inherit the input from house-list
  @Input() inmueble!: Inmueble;

  constructor(private router:Router){}

  goToDetail(){
    this.router.navigate(['/inmueble/',this.inmueble.id]);
  }

  goToEdit(){
    this.router.navigate(['/inmueble/edit/',this.inmueble.id]);
  }
  
}
