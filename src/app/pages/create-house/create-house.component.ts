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

  guardarInmueble(): void {
    const formValue = this.inmuebleForm.value;

    const dto: InmuebleRequestDTO = {
      titulo: formValue.titulo,
      subtitulo: formValue.subtitle,
      descripcion: formValue.descripcion,
      precio: String(formValue.precio),
      localidad: formValue.localidad,
      banios: formValue.banios ?? 0,
      dormitorios: formValue.dormitorios,
      tipoId: formValue.tipoInmueble,
      contratoId: formValue.tipoContrato,
      foto_principal: this.newImages.length > 0 ? this.newImages[0].name : '',
      galeria_fotos: this.newImages.map(f => f.name).join(',')
    };

    this.inmuebleService.createInmueble(dto).subscribe({
      next: () => {
        alert('Inmueble creado correctamente');
        this.router.navigate(['/inmuebles']);
      },
      error: err => {
        console.error('Error al crear inmueble:', err);
        alert('Error al crear inmueble');
      }
    });
  }
}
