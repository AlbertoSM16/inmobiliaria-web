import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule],
})

export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  
  login() {
    console.log('Intentando iniciar sesión con', this.username, this.password);

    const body = {
      usuario: this.username,
      password: this.password
    };

    console.log(body)
    this.http.post('/login', body, { observe: 'response' }).subscribe({
      next: response => {

        const token = response.headers.get('Authorization');
        
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('username', this.username);
          console.log('Token recibido:',token);
          const decoded : JwtPayload  = jwtDecode(token);
          this.router.navigate(['houses-list']); 
        } else {
          this.errorMessage = 'Token no recibido.';
        }
      },
      error: err => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Error en login:', err);
      }
    });
  }
}
