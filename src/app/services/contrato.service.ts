import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiUrl = 'http://localhost:8080/api/contracts';
  constructor(private http: HttpClient) { }

  getAll():Observable<Contract[]>{
    return this.http.get<Contract[]>(this.apiUrl);
  }
  
  getById(id: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/${id}`);
  }
}
