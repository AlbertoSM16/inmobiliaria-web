import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../models/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private apiUrl = 'http://localhost:8080/api/inmuebles';
  constructor(private http: HttpClient) { }

  getAll():Observable<Inmueble[]>{
    return this.http.get<Inmueble[]>(this.apiUrl);

  }

  getById(id: number): Observable<Inmueble>{
    return this.http.get<Inmueble>(this.apiUrl + '/' + id)
  }

  // searches

  getByFilters(localidad: string, tipoId: number, contratoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/all?localidad=${localidad}&tipoId=${tipoId}&contratoId=${contratoId}`);
  }
  
  getByTypes(tipoId: number, contratoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/type?tipoId=${tipoId}&contratoId=${contratoId}`)
  }


}
