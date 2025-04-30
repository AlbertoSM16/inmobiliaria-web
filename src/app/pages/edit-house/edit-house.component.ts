import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoService } from '../../services/tipo.service';
import { ContratoService } from '../../services/contrato.service';
import { Tipo } from '../../models/tipo';
import { Contract } from '../../models/contract';
import { HeaderComponent } from '../../components/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoContratoService } from '../../services/tipoContrato.service';
import { InmuebleTipoService } from '../../services/inmuebleTipo.service';
import { TipoInmueble } from '../../models/tipoInmueble';

@Component({
  selector: 'edit-house',
  templateUrl: './edit-house.component.html',
  styleUrl: './edit-house.component.css',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, NgFor]
})
export class EditHouseComponent implements OnInit {

  inmuebleForm!: FormGroup;
  idInmueble!: number;
  tiposInmuebles!: Tipo[];
  tiposContratos!: Contract[];
   typeBuilding !: TipoInmueble;
    typeBuildingName !: Tipo;
    typeContract !: any;
    typeContractName !: any;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: TipoService,
    private contratoService: ContratoService,
    private tipoContratoService: TipoContratoService,
    private inmuebleTipoService: InmuebleTipoService
  ) {}

  ngOnInit(): void {
    this.idInmueble = this.route.snapshot.params['id'];

    this.inmuebleForm = this.fb.group({
      titulo: ['', Validators.required],
      subtitle: ['',Validators.required],
      descripcion: ['',Validators.required],
      area: ['',Validators.required],
      precio: ['', Validators.required],
      localidad: ['', Validators.required],
      banios: [''],
      dormitorios: [''],
      tipoInmueble: ['', Validators.required],
      tipoContrato: ['', Validators.required]
    });

    this.tipoService.getAll().subscribe(data => {
      this.tiposInmuebles = data;
    });

    this.contratoService.getAll().subscribe(data => {
      this.tiposContratos = data;
    });

    this.inmuebleService.getById(this.idInmueble).subscribe(data => {
      this.tipoContratoService.getTypeContract(this.idInmueble).subscribe(dataContract =>{
        this.typeContract = dataContract[0];
        this.contratoService.getById(this.typeContract.contrato.id).subscribe(dataContractName =>{
          this.typeContractName = dataContractName[0];

        })
      })
      this.inmuebleTipoService.getTypeBuilding(this.idInmueble).subscribe(dataType => {
        this.typeBuilding = dataType[0];
        this.tipoService.getById(this.typeBuilding.tipoInmuebleId).subscribe(dataTipo =>{
          this.typeBuildingName = dataTipo[0];
        })
      })
      console.log(this.typeBuildingName);
      console.log(this.typeContractName);
      this.inmuebleForm.patchValue({
        titulo: data.titulo,
        subtitle: data.subtitulo,
        descripcion: data.descripcion,
        area: data.area,
        precio: data.precio,
        localidad: data.localidad,
        banios: data.banios,
        dormitorios: data.dormitorios,
        tipoInmueble: this.typeBuilding,
        tipoContrato: this.typeContract
      });
    });
  }

  guardarCambios(): void {
    if (this.inmuebleForm.valid) {
      const inmuebleActualizado = {
        id: this.idInmueble,
        titulo: this.inmuebleForm.get('titulo')?.value,
        precio: this.inmuebleForm.get('precio')?.value,
        descripcion: this.inmuebleForm.get('descripcion')?.value,
        localidad: this.inmuebleForm.get('localidad')?.value,
        banios: this.inmuebleForm.get('banios')?.value,
        dormitorios: this.inmuebleForm.get('dormitorios')?.value,
        subtitulo: this.inmuebleForm.get('subtitle')?.value,
        area: this.inmuebleForm.get('area')?.value,
        tipoId: this.inmuebleForm.get('tipoInmueble')?.value,
        contratoId: this.inmuebleForm.get('tipoContrato')?.value,
        foto_principal: '',   // No se modifica aquí
        galeria_fotos: ''     // No se modifica aquí
      };

      this.inmuebleService.update(this.idInmueble, inmuebleActualizado).subscribe({
        next: () => {
          console.log('✅ Inmueble actualizado correctamente');
          this.router.navigate(['/houses-list']);
        },
        error: (err) => {
          console.error('❌ Error actualizando inmueble', err);
        }
      });
    } else {
      console.warn('⚠️ Formulario inválido');
    }
  }
}
