import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InmuebleService } from '../../services/inmueble.service';
import { TipoService } from '../../services/tipo.service';
import { ContratoService } from '../../services/contrato.service';
import { Router } from '@angular/router';
import { Tipo } from '../../models/tipo';
import { Contract } from '../../models/contract';
import { HeaderComponent } from '../../components/header/header.component';
import { InmuebleRequestDTO } from '../../models/InmuebleRequestDTO';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'create-house',
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.css',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule,NgIf,NgFor]
})
export class CreateHouseComponent implements OnInit {

  inmuebleForm!: FormGroup;
  tiposInmuebles!: Tipo[];
  tiposContratos!: Contract[];
  selectedFiles: File[] = [];
  newImages: File[] = [];
  previewImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private contratoService: ContratoService,
    private tipoService: TipoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tipoService.getAll().subscribe(data => {
      this.tiposInmuebles = data;
      console.log(this.tiposInmuebles);
    });
  
    this.contratoService.getAll().subscribe(data => {
      this.tiposContratos = data;
      console.log(this.tiposContratos);
    });

    this.formInitialized();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    this.newImages = [];
    this.previewImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.newImages.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImages.push(e.target.result);
      reader.readAsDataURL(file);
    }

    // Usamos la primera como foto principal
    if (this.newImages.length > 0) {
      this.inmuebleForm.get('fotoPrincipal')?.setValue(this.newImages[0].name);
    }
  }

  formInitialized() {
    this.inmuebleForm = this.fb.group({
      titulo: ['', Validators.required],
      subtitle: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      localidad: ['', Validators.required],
      banios: [null],
      dormitorios: [null],
      tipoInmueble: [null, Validators.required],
      tipoContrato: [null, Validators.required],
      fotoPrincipal: [null, Validators.required]
    });
  }

  guardarInmueble() {
    if (this.inmuebleForm.valid && this.selectedFiles.length > 0) {
      const formData = new FormData();
  
      formData.append('titulo', this.inmuebleForm.get('titulo')?.value);
      formData.append('precio', this.inmuebleForm.get('precio')?.value);
      formData.append('descripcion', this.inmuebleForm.get('descripcion')?.value);
      formData.append('localidad', this.inmuebleForm.get('localidad')?.value);
      formData.append('banios', this.inmuebleForm.get('banios')?.value.toString());
      formData.append('dormitorios', this.inmuebleForm.get('dormitorios')?.value.toString());
      formData.append('subtitulo', this.inmuebleForm.get('subtitulo')?.value);
      formData.append('tipoId', this.inmuebleForm.get('tipoInmueble')?.value.toString());
      formData.append('contratoId', this.inmuebleForm.get('tipoContrato')?.value.toString());
  
      // Fotos
      formData.append('fotoPrincipal', this.selectedFiles[0]);
      for (let i = 1; i < this.selectedFiles.length; i++) {
        formData.append('galeriaFotos', this.selectedFiles[i]);
      }
  
      this.inmuebleService.crearInmueble(formData).subscribe(response => {
        console.log('Inmueble creado con éxito', response);
      });
    }
  }
  
}
