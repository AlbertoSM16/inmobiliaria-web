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
}
