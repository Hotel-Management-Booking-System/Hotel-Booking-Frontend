import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking, CreateBooking, UpdateBookingStatus } from '../models/booking.model';

// BookingService handles all booking-related API calls.
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // Create a new booking (logged-in user)
  createBooking(booking: CreateBooking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  // Get all bookings for the current logged-in user
  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my`);
  }

  // Cancel a booking by ID (user)
  cancelBooking(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/cancel`, {});
  }

  // Admin: Get all bookings in the system
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  // Admin: Update the status of a booking
  updateBookingStatus(id: number, status: UpdateBookingStatus): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, status);
  }

  // Admin: Delete a booking
  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get a single booking by ID
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }
}
