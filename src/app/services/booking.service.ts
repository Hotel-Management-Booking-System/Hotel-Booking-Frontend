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

  constructor(private http: HttpClient) { }

  // ✅ Create booking
  createBooking(booking: CreateBooking): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }

  // ✅ Get current user bookings
  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my-bookings`);
  }

  // ✅ Admin: Get all bookings
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/all`);
  }

  // ✅ Admin: Update booking status
  updateBookingStatus(dto: UpdateBookingStatus): Observable<any> {
    return this.http.put(`${this.apiUrl}/status`, dto);
  }
}

