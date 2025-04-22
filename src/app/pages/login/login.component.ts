import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}
  
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {

    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/home']);
      console.log('Inicio de sesión exitoso');
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }
}
