import { Component } from '@angular/core';
import { BuscadorComponent } from '../../components/buscador/buscador.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from '../../components/house-card/house-card.component';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
  page = 0;
  size = 3;
  totalPages = 0;
  noResultsMessage: string = '';
  noResults: boolean = false;
  isLoggedIn$!: Observable<boolean>;

  constructor(private inmuebleService: InmuebleService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.noResultsMessage = '';

   this.loadPage(this.page);
  }

  goToCreate() {
    this.router.navigate(['create']);

  }

  loadPage(page: number) {
    this.inmuebleService.getInmueblesPaginated(page, this.size).subscribe(res => {
      this.inmuebles = res.content;
      this.page = res.number;
      this.totalPages = res.totalPages;
    });
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.loadPage(newPage);
    }
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No hay inmuebles con esas características!",
        });
      }
    });
  }

  removeInmueble(id: number) {
    this.inmuebles = this.inmuebles.filter(inmueble => inmueble.id !== id);
    if (this.inmuebles.length === 0) {
      this.noResults = true;
    }
  }

}
