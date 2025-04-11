import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private apiUrl = 'http://localhost:8080/api/inmuebles';
  constructor(private http: HttpClient) { }


  getAll()Observable<any[]>{
    
    return this.http.get<any[]>{this.apiUrl+'/type'};
  }

}
