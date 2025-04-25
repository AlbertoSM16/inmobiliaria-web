import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../models/inmueble';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TipoContratoService } from '../../services/tipoContrato.service';
import { HeaderComponent } from "../../components/header/header.component";
import { InmuebleTipoService } from '../../services/inmuebleTipo.service';
import { TipoService } from '../../services/tipo.service';
import { TipoContrato } from '../../models/tipoContrato';
import { TipoInmueble } from '../../models/tipoInmueble';
import { Tipo } from '../../models/tipo';
import { Contract } from '../../models/contract';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'house-info',
  imports: [CommonModule, HeaderComponent],
  standalone: true,
  templateUrl: './house-info.component.html',
  styleUrl: './house-info.component.css'
})
export class HouseInfoComponent implements OnInit {

  inmueble !: Inmueble;
  typeBuilding !: TipoInmueble;
  typeBuildingName !: Tipo;
  typeContract !: TipoContrato;
  typeContractName !: Contract;
  constructor(
    private inmuebleService: InmuebleService,
    private route: ActivatedRoute,
    private tipoContratoService: TipoContratoService,
    private contratoService : ContratoService,
    private inmuebleTipoService: InmuebleTipoService,
    private tipoService: TipoService,
    private router: Router) { }

  goToList() {
    this.router.navigate(['/houses-list/']);
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.inmuebleService.getById(id).subscribe(data => {
      console.log(data);
      this.inmueble = data;
      this.tipoContratoService.getTypeContract(this.inmueble.id).subscribe(dataContract =>{
        this.typeContract = dataContract[0];
        this.contratoService.getById(this.typeContract.id).subscribe(dataContractName =>{
          this.typeContractName = dataContractName[0];

        })
      })
      this.inmuebleTipoService.getTypeBuilding(this.inmueble.id).subscribe(dataType => {
        this.typeBuilding = dataType[0];
        this.tipoService.getById(this.typeBuilding.tipoInmuebleId).subscribe(dataTipo =>{
          this.typeBuildingName = dataTipo[0];
        })
      })
    })

  }
}
