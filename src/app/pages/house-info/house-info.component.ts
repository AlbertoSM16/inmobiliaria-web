import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'house-info',
  imports: [CommonModule, HeaderComponent],
  standalone: true,
  templateUrl: './house-info.component.html',
  styleUrl: './house-info.component.css'
})
export class HouseInfoComponent implements OnInit {

  inmueble !: Inmueble;
  constructor(private inmuebleService: InmuebleService, private route: ActivatedRoute, private router: Router){}
  
  goToList(){
    this.router.navigate(['/houses-list/']);
  }
  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.inmuebleService.getById(id).subscribe(data =>{
      this.inmueble = data;
    })

  }

}
