import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

// Login component - handles user login form submission.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // The login form data bound via ngModel
  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  // Message strings to show feedback to the user
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Called when the user submits the login form
  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        // Save token and user info in localStorage
        this.authService.saveAuthData(response);
        this.successMessage = 'Login successful! Redirecting...';
        this.isLoading = false;
        console.log(response);
        // Redirect admin to admin panel, users to hotels
        if (response.role === 1) { // 1 = Admin
          this.router.navigate(['/admin/manage-hotels']);
        } else {
          this.router.navigate(['/hotels']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password. Please try again.';
      }
    });
  }
}
