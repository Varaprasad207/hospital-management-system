import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('userRole', 'ADMIN');
      return true;
    }

    if (username === 'doctor' && password === 'doctor123') {
      localStorage.setItem('userRole', 'DOCTOR');
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
