import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule, NgIf],
})

export class AuthComponent {
  usuario: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    console.log('Intentando iniciar sesión...');
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.password);
    this.http.post<any>('/login', {
      usuario: this.usuario,
      password: this.password
    }, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response'
    }).subscribe(
      response => {
        const token = response.body['token'];
        this.authService.login(token);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['houses-list']);
      },
      error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrectos"
         
        });
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}

