import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Navbar component - shown at the top of every page.
// It shows different links based on login status and role.
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // Log out and go to login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
