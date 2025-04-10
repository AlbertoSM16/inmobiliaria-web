import { Component, Input } from '@angular/core';
import { Inmueble } from '../../models/inmueble';

@Component({
  selector: 'house-card',
  imports: [],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  // I need to inherit the input from house-list
  @Input() inmueble!: Inmueble;
}
