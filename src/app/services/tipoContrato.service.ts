import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoContrato } from '../models/tipoContrato';


@Injectable({
  providedIn: 'root'
})
export class TipoContratoService {

    private apiUrl = 'http://localhost:8080/api/type-contract';
    constructor(private http: HttpClient) { }

    getTypeContract(id:number):Observable<TipoContrato[]>{
        return this.http.get<TipoContrato[]>(this.apiUrl + '/' + id);
    }
}