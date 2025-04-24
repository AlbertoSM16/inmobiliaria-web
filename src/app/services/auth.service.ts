import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      this.loggedIn.next(!!token); // true si hay token
    }
  }

  login(token: string): void {
    sessionStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
