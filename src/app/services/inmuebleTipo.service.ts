import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/tipo';
import { Observable } from 'rxjs';
import { TipoInmueble } from '../models/tipoInmueble';


@Injectable({
  providedIn: 'root'
})
export class InmuebleTipoService {

  private apiUrl = 'http://localhost:8080/api/type-buildings';
  constructor(private http: HttpClient) { }

  getTypeBuilding(id:number):Observable<TipoInmueble[]>{
    return this.http.get<TipoInmueble[]>(this.apiUrl + '/' + id)
  }
  
}
