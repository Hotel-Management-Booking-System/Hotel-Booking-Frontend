import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Promotion, CreatePromotion } from '../models/promotion.model';

// UserService handles user profile and admin promotion management.
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get the current logged-in user's profile
  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  // Admin: Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Admin: Get all promotions
  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/promotions/all`);
  }

  // Admin: Create a new promotion
  createPromotion(promo: CreatePromotion): Observable<Promotion> {
    return this.http.post<Promotion>(`${this.apiUrl}/promotions`, promo);
  }

  // Admin: Update a promotion
  updatePromotion(id: number, promo: CreatePromotion): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/promotions/${id}`, promo);
  }

  // Admin: Delete a promotion
  deletePromotion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/promotions/${id}`);
  }

  // Validate a promo code (for users during booking)
  validatePromoCode(code: string): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.apiUrl}/promotions/validate/${code}`);
  }
}
