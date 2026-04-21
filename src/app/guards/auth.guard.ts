import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// This guard protects routes that require the user to be logged in.
// If no token is found in localStorage, it redirects to /login.
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Token exists, allow navigation
      return true;
    }

    // No token - redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
