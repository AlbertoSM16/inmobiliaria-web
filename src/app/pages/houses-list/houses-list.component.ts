import { Component } from '@angular/core';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from '../../components/house-card/house-card.component';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-houses-list',
  imports: [BuscadorComponent, HeaderComponent, HouseCardComponent, FormsModule, CommonModule, NgForOf],
  standalone: true,
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.css'
})
export class HousesListComponent {
  inmuebles: Inmueble[] = [];
  searchDone: boolean = false;
  noResults:boolean = false;

  constructor(private inmuebleService: InmuebleService) { }

  ngOnInit(): void {
    this.inmuebleService.getAll().subscribe({
      next: data => this.inmuebles = data,
      error: err => console.error('Error al obtener inmuebles', err)

    })
  }

  searchByFilter(filters: any) {
    //i put this because i want to  control error messages
    this.searchDone = true;
    this.noResults = false;

    this.inmuebleService.getByFilters(
      filters.localidad,
      filters.tipoId,
      filters.contratoId
    ).subscribe({
      next: (data) => {
        this.inmuebles = data;
      },
      error: (error) => {
        this.inmuebles = [];
        this.noResults = true; 
      }
    });
  }

}
