import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

// This guard protects admin-only routes.
// It checks the user's role stored in localStorage.
// If the role is not 'Admin', it redirects to /home.
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('role');

    // Get the required role from the route data
    const requiredRole = route.data['role'] as string;

    if (role === requiredRole) {
      // Role matches, allow navigation
      return true;
    }

    // Role doesn't match, redirect to home
    this.router.navigate(['/home']);
    return false;
  }
}
