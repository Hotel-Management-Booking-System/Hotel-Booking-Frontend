import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

// AuthService handles login, registration, and user session data (localStorage).
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }

  // Send login credentials to the backend
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  // Send registration data to the backend
  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // Save auth data to localStorage after successful login
  saveAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role.toString()); // Store as string
    localStorage.setItem('email', response.email);
    localStorage.setItem('userId', response.userId.toString());
    localStorage.setItem('fullName', response.fullName);
  }

  // Remove all auth data from localStorage (logout)
  logout(): void {
    localStorage.clear();
  }

  // Check if the user is currently logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Get the current user's role
  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  // Get the current user's first name
  getFullName(): string {
    return localStorage.getItem('fullName') || '';
  }

  // Check if the current user is an admin
  isAdmin(): boolean {
    return this.getRole() === '1'; // 1 = Admin enum value
  }

  // Get the current user's ID
  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }
}
