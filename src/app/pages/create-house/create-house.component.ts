import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { TipoService } from '../../services/tipo.service';
import { ContratoService } from '../../services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Contrato } from '../../models/contracto';
import { Tipo } from '../../models/tipo';
import { HeaderComponent } from '../../components/header/header.component';
import { InmuebleTipoService } from '../../services/inmuebleTipo.service';
import { TipoInmueble } from '../../models/tipoInmueble';

@Component({
  selector: 'create-house',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.css'
})
export class CreateHouseComponent implements OnInit {

  inmuebleForm !: FormGroup;
  inmueble!: Inmueble;
  tipoInmueble!: TipoInmueble;
  tiposInmuebles!: Tipo[];
  tipoContrato!: Contrato;
  tiposContratos!: Contrato[];

  constructor(private inmuebleService: InmuebleService, private inmuebleTipoService: InmuebleTipoService, private contratoService: ContratoService, private tipoService: TipoService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.inmuebleService.getById(id).subscribe(data => {
      this.inmueble = data;

      this.inmuebleTipoService.getTypeBuilding(this.inmueble.id).subscribe(dataType => {
        this.tipoInmueble = dataType[0];
        console.log(dataType[0].tipoInmuebleId);
        
        this.formInitialized();

      });

    });

    this.contratoService.getAll().subscribe(data => {
      this.tiposContratos = data;
    });

    this.tipoService.getAll().subscribe(data => {
      this.tiposInmuebles = data;
    });
  }

  //tu edit inmueble
  formInitialized() {
    this.inmuebleForm = this.fb.group({
      titulo: [this.inmueble.titulo || ''],
      subtitle: [this.inmueble.subtitulo || ''],
      descripcion: [this.inmueble.descripcion || ''],
      precio: [this.inmueble.precio || 0],
      localidad: [this.inmueble.localidad || ''],
      banios: [this.inmueble.banios || 0],
      tipoInmueble: [this.tipoInmueble.tipoInmuebleId || null],
      // tipoContratoId: [this.inmueble.tipoContrato?.id || null]
    });

  }

}
