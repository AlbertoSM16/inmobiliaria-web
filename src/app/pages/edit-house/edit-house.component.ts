import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InmuebleService } from '../../services/inmueble.service';
import { NgFor } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { TipoService } from '../../services/tipo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoInmueble } from '../../models/tipoInmueble';
import { Tipo } from '../../models/tipo';
import { ContratoService } from '../../services/contrato.service';
import { InmuebleTipoService } from '../../services/inmuebleTipo.service';
import { TipoContratoService } from '../../services/tipoContrato.service';
import { TipoContrato } from '../../models/tipoContrato';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  standalone: true,
  imports: [NgFor, HeaderComponent, ReactiveFormsModule,CommonModule],
})
export class EditHouseComponent implements OnInit {
  inmuebleForm!: FormGroup;
  inmueble: any;
  galeriaActual: string[] = [];
  nuevasFotosGaleria: File[] = [];
  nuevaFotoPrincipal?: File;
  tiposInmuebles: any[] = [];
  tiposContratos: any[] = [];
  typeBuilding !: any;
  typeBuildingName !: any;
  typeContract !: any;
  typeContractName !: any;


  constructor(
    private fb: FormBuilder,
  private inmuebleService: InmuebleService,
     private route: ActivatedRoute,
     private tipoContratoService: TipoContratoService,
     private contratoService : ContratoService,
     private inmuebleTipoService: InmuebleTipoService,
     private tipoService: TipoService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.inmuebleService.getById(id).subscribe(data => {
      this.inmueble = data;
      this.galeriaActual = data.galeria_fotos ? data.galeria_fotos.split(',') : [];
  
      forkJoin({
        typeContract: this.tipoContratoService.getTypeContract(data.id),
        typeBuilding: this.inmuebleTipoService.getTypeBuilding(data.id)
      }).subscribe(({ typeContract, typeBuilding }) => {
        this.typeContract = typeContract[0];
        this.typeBuilding = typeBuilding[0];
  
        forkJoin({
          typeContractName: this.contratoService.getById(this.typeContract.contrato.id),
          typeBuildingName: this.tipoService.getById(this.typeBuilding.tipoInmuebleId),
          tiposInmuebles: this.tipoService.getAll(),
          tiposContratos: this.contratoService.getAll()
        }).subscribe(({ typeContractName, typeBuildingName, tiposInmuebles, tiposContratos }) => {
          this.typeContractName = typeContractName[0];
          this.typeBuildingName = typeBuildingName[0];
          this.tiposInmuebles = tiposInmuebles;
          this.tiposContratos = tiposContratos;
  
          this.inmuebleForm = this.fb.group({
            titulo: [this.inmueble.titulo],
            subtitulo: [this.inmueble.subtitulo],
            descripcion: [this.inmueble.descripcion],
            area: [this.inmueble.area],
            precio: [this.inmueble.precio],
            localidad: [this.inmueble.localidad],
            banios: [this.inmueble.banios],
            dormitorios: [this.inmueble.dormitorios],
            tipoId: [this.typeBuildingName.id],      
            tipoContrato: [this.typeContractName.id]  
          });
        });
      });
    });
  }

  eliminarFotoGaleria(index: number): void {
    const foto = this.galeriaActual[index];
    this.http.delete('http://localhost:8080/api/inmuebles/delete-file', {
      params: { path: foto }
    }).subscribe({
      next: () => this.galeriaActual.splice(index, 1),
      error: () => console.error('Error al eliminar la imagen del servidor')
    });
  }

  onNuevasFotosGaleriaChange(event: any): void {
    this.nuevasFotosGaleria = Array.from(event.target.files);
  }

  onNuevaFotoPrincipalChange(event: any): void {
    this.nuevaFotoPrincipal = event.target.files[0];
  }

  guardarCambios(): void {
    const formData = new FormData();
    const formValues = this.inmuebleForm.value;

    const dto = {
      titulo: formValues.titulo,
      precio: formValues.precio,
      descripcion: formValues.descripcion,
      localidad: formValues.localidad,
      galeria_fotos: this.galeriaActual.join(','),
      foto_principal: this.inmueble.foto_principal,
      banios: formValues.banios,
      area: formValues.area,
      dormitorios: formValues.dormitorios,
      subtitulo: formValues.subtitulo,
      tipoId: formValues.tipoId,
      contratoId: formValues.tipoContrato
    };
    console.log("DTO que se envía:", dto); 

    formData.append('dto', JSON.stringify(dto));

    if (this.nuevaFotoPrincipal) {
      formData.append('nuevaFotoPrincipal', this.nuevaFotoPrincipal);
    }

    this.nuevasFotosGaleria.forEach(file => {
      formData.append('nuevasGaleria', file);
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.inmuebleService.updateWithFiles(id!, formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}