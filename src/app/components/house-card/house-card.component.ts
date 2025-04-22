import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { Router } from '@angular/router';
import { InmuebleService } from '../../services/inmueble.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'house-card',
  imports: [],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  // I need to inherit the input from house-list
  @Input() inmueble!: Inmueble;

  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router, private inmuebleService: InmuebleService) { }

  goToDetail() {
    this.router.navigate(['/inmueble/', this.inmueble.id]);
  }

  deleteBuilding() {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este inmueble?",
      text: "No podrás volver a atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!"

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "Inmueble eliminado con exito.",
          icon: "success"
        });
        this.inmuebleService.delete(this.inmueble.id).subscribe({
          next: () => {
    
            this.deleted.emit(this.inmueble.id);
    
            this.router.navigate(['/inmuebles']);
          },
          error: err => {
            console.error('Error al eliminar inmueble:', err);
            alert('Error al eliminar inmueble');
          }
        });
      }
    });
    
  }

  goToEdit() {
    this.router.navigate(['/inmueble/edit/', this.inmueble.id]);
  }

}
