import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'buscador',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  tipoContrato: string = "1";
  tipoInmueble: string = "1";
  localidad: string="";

  @Output() onSearch = new EventEmitter<any>();

  search(){
    this.onSearch.emit({
      localidad: this.localidad,
      tipoId: this.tipoInmueble,
      contratoId: this.tipoContrato
    })
  }
}
