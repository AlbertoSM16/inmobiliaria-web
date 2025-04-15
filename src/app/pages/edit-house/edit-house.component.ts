import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { TipoService } from '../../services/tipo.service';
import { ContratoService } from '../../services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Contract } from '../../models/contract';
import { Tipo } from '../../models/tipo';
import { HeaderComponent } from '../../components/header/header.component';
import { InmuebleTipoService } from '../../services/inmuebleTipo.service';
import { TipoInmueble } from '../../models/tipoInmueble';
import { TipoContratoService } from '../../services/tipoContrato.service';
import { TipoContrato } from '../../models/tipoContrato';


@Component({
  selector: 'edit-house',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './edit-house.component.html',
  styleUrl: './edit-house.component.css'
})
export class EditHouseComponent implements OnInit {

  inmuebleForm!: FormGroup;
  inmueble!: Inmueble;
  tipoInmueble!: TipoInmueble;
  tiposInmuebles!: Tipo[];
  tipoContrato!: TipoContrato;
  tiposContratos!: Contract[];
  newImages: File[] = [];
  galeriaAux: { nombre: string, url: string }[] = [];

  constructor(
    private inmuebleService: InmuebleService,
    private tipoContratoService: TipoContratoService,
    private inmuebleTipoService: InmuebleTipoService,
    private contratoService: ContratoService,
    private tipoService: TipoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.inmuebleService.getById(id).subscribe(data => {
      this.inmueble = data;

      if (this.inmueble.galeria_fotos) {
        this.galeriaAux = this.inmueble.galeria_fotos
          .split(',')
          .map((nombre: string) => ({
            nombre: nombre.trim(),
            url: `assets/${nombre.trim()}`
          }));
      }

      this.inmuebleTipoService.getTypeBuilding(this.inmueble.id).subscribe(dataType => {
        this.tipoInmueble = dataType[0];

        this.tipoContratoService.getTypeContract(this.inmueble.id).subscribe((datatypeContract: any) => {
          this.tipoContrato = datatypeContract[0].contrato;
          this.formInitialized();
        });
      });
    });

    this.contratoService.getAll().subscribe(data => {
      this.tiposContratos = data;
    });

    this.tipoService.getAll().subscribe(data => {
      this.tiposInmuebles = data;
    });
  }

  formInitialized() {
    this.inmuebleForm = this.fb.group({
      titulo: [this.inmueble.titulo || ''],
      subtitle: [this.inmueble.subtitulo || ''],
      descripcion: [this.inmueble.descripcion || ''],
      imagenes: [this.inmueble.galeria_fotos || ''],
      precio: [this.inmueble.precio || 0],
      localidad: [this.inmueble.localidad || ''],
      banios: [this.inmueble.banios || 0],
      tipoInmueble: [this.tipoInmueble.tipoInmuebleId || null],
      tipoContrato: [this.tipoContrato?.id || null]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.newImages.push(event.target.files[i]);
      }
      console.log("Fotos seleccionadas:", this.newImages);
    }
  }

  eliminarFoto(nombre: string) {
    this.galeriaAux = this.galeriaAux.filter(foto => foto.nombre !== nombre);
  }

  guardarCambios() {
    const formData = new FormData();

    const formValue = this.inmuebleForm.value;
    for (let key in formValue) {
      if (key !== 'imagenes') {
        formData.append(key, formValue[key]);
      }
    }

    // Añadir imágenes nuevas
    this.newImages.forEach((img) => {
      formData.append('imagenes', img);
    });

    // Añadir galería final (nombres separados por coma)
    const galeriaFinal = this.galeriaAux.map(f => f.nombre).join(',');
    formData.append('galeria_fotos', galeriaFinal);

    // this.inmuebleService.updateInmueble(this.inmueble.id, formData).subscribe(() => {
    //   console.log("Inmueble actualizado correctamente");
    //   this.router.navigate(['/ruta-a-la-lista']);
    // });
  }
}
