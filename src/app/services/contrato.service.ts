import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../models/contracto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiUrl = 'http://localhost:8080/api/contracts';
  constructor(private http: HttpClient) { }

  getAll():Observable<Contrato[]>{

    return this.http.get<Contrato[]>(this.apiUrl);
  }
  
}
