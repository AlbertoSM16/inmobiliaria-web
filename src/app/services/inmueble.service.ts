import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../models/inmueble';
import { InmuebleRequestDTO } from '../models/InmuebleRequestDTO';

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
  //create
  createInmueble(dto: InmuebleRequestDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }
  // searches

  getByFilters(localidad: string, tipoId: number, contratoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/all?localidad=${localidad}&tipoId=${tipoId}&contratoId=${contratoId}`);
  }
  
  getByTypes(tipoId: number, contratoId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/type?tipoId=${tipoId}&contratoId=${contratoId}`)
  }

  //edit
  update(inmueble: Inmueble): Observable<Inmueble>{
    return this.http.put<Inmueble>(this.apiUrl, inmueble);
  }

  //create
  create(inmueble: Inmueble): Observable<Inmueble>{
    return this.http.post<Inmueble>(this.apiUrl, inmueble);
  }

  //delete
  delete(id: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }


}
