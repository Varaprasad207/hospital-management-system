import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // 1️⃣ Login check
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Role check (only if route defines role)
    const requiredRole = route.data['role'];
    const userRole = this.authService.getUserRole();

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}

