import { Component } from '@angular/core';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-houses-list',
  imports: [BuscadorComponent,HeaderComponent],
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.css'
})
export class HousesListComponent {
  
}
