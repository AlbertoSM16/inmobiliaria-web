import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InmuebleService } from '../../services/inmueble.service';
import { TipoService } from '../../services/tipo.service';
import { ContratoService } from '../../services/contrato.service';
import { Router } from '@angular/router';
import { Tipo } from '../../models/tipo';
import { Contract } from '../../models/contract';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'create-house',
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.css',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, NgFor,CommonModule]
})
export class CreateHouseComponent {

  inmuebleForm!: FormGroup;
  tiposInmuebles!: Tipo[];
  tiposContratos!: Contract[];

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'warning' | 'error' = 'success';

  fotoPrincipalFile: File | null = null;
  galeriaFiles: File[] = [];

  previewPrincipal: string | null = null;
  previewGaleria: string[] = [];

  cantidadFotosGaleria: number = 0;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private router: Router,
    private tipoService: TipoService,
    private contratoService: ContratoService
  ) {
    // Cargar tipos de inmueble
    this.tipoService.getAll().subscribe(data => {
      this.tiposInmuebles = data;
    });

    // Cargar tipos de contrato
    this.contratoService.getAll().subscribe(data => {
      this.tiposContratos = data;
    });

    // Definir el formulario
    this.inmuebleForm = this.fb.group({
      titulo: [''],
      subtitle: [''],
      descripcion: [''],
      area: [''],
      precio: [''],
      localidad: [''],
      banios: [''],
      dormitorios: [''],
      tipoInmueble: [''],
      tipoContrato: ['']
    });
  }
  mostrarToast(mensaje: string, tipo: 'success' | 'warning' | 'error') {
    this.toastMessage = mensaje;
    this.toastType = tipo;
    this.showToast = true;
  
    setTimeout(() => {
      this.showToast = false;
    }, 3000); 
  }
  

  onFotoPrincipalSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoPrincipalFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewPrincipal = e.target.result;
      };
      if (this.fotoPrincipalFile) {
        reader.readAsDataURL(this.fotoPrincipalFile);
      }
    }
  }

  onGaleriaFotosSelected(event: any) {
    if (event.target.files) {
      this.galeriaFiles = Array.from(event.target.files);

      this.cantidadFotosGaleria = this.galeriaFiles.length; // 💥 Actualizar contador

      this.previewGaleria = [];
      this.galeriaFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewGaleria.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  guardarInmueble() {
    if (this.inmuebleForm.valid && this.fotoPrincipalFile && this.galeriaFiles.length > 0) {
      const formData = new FormData();

      // Añadir datos del formulario
      formData.append('titulo', this.inmuebleForm.get('titulo')?.value);
      formData.append('subtitulo', this.inmuebleForm.get('subtitle')?.value);
      formData.append('descripcion', this.inmuebleForm.get('descripcion')?.value);
      formData.append('area', this.inmuebleForm.get('area')?.value.toString());
      formData.append('precio', this.inmuebleForm.get('precio')?.value.toString());
      formData.append('localidad', this.inmuebleForm.get('localidad')?.value);
      formData.append('banios', this.inmuebleForm.get('banios')?.value.toString());
      formData.append('dormitorios', this.inmuebleForm.get('dormitorios')?.value.toString());
      formData.append('tipoId', this.inmuebleForm.get('tipoInmueble')?.value.toString());
      formData.append('contratoId', this.inmuebleForm.get('tipoContrato')?.value.toString());

      // Añadir imagen principal
      formData.append('fotoPrincipal', this.fotoPrincipalFile);

      // Añadir imágenes de galería
      this.galeriaFiles.forEach(file => {
        formData.append('galeriaFotos', file);
      });

      // Enviar al servicio
      this.inmuebleService.crearInmueble(formData).subscribe({
        next: (response) => {
          this.mostrarToast('¡Inmueble creado correctamente!', 'success');
          setTimeout(() => {
            this.router.navigate(['/houses-list']);
          }, 3000);
        },
        error: (error) => {
          this.mostrarToast('Error al crear inmueble. Inténtalo de nuevo.', 'error');
        }
      });
    } else {
      this.mostrarToast('Completa todos los campos y selecciona imágenes.', 'warning');
    }
  }
}
