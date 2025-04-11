import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,NgForm, FormBuilder } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-house',
  imports: [ReactiveFormsModule],
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.css'
})
export class CreateHouseComponent implements OnInit {
  
  inmuebleForm !: FormGroup;
  inmueble!: Inmueble;
  constructor(private inmuebleService: InmuebleService, private router: Router, private route:ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit():void{

    const id = Number(this.route.snapshot.paramMap.get('id'));
    // i take the data from the object
    this.inmuebleService.getById(id).subscribe(data =>{
      this.inmueble = data;
    })

    this.inmuebleForm = this.fb.group({
      titulo: [''],
      subtitle: [''],
      descripcion: [''],
      precio: [null],
      localidad: [''],
      banios: [null],
      tipoInmuebleId: [null],
      tipoContratoId: [null]
    });

  }

  onSave(form: NgForm){

  }

}
