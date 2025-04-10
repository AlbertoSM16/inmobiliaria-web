import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'buscador',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  tipoContrato: string = "";
  tipoInmueble: string = "";
  localidad: string="";
}
