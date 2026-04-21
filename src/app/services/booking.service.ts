import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Booking, CreateBooking, UpdateBookingStatus } from '../models/booking.model';

// BookingService handles all booking-related API calls.
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) { }

  // 🔥 Normalize booking data from backend (handles PascalCase and nested objects)
  private mapBooking(b: any): Booking {
    return {
      id: b.id || b.Id,
      userId: b.userId || b.UserId || b.user?.id || b.user?.userId || b.User?.Id,
      userName: b.userName || b.UserName || b.user?.fullName || b.user?.name || b.User?.FullName,
      roomId: b.roomId || b.RoomId || b.room?.id || b.Room?.Id,
      roomNumber: b.roomNumber || b.RoomNumber || b.room?.roomNumber || b.Room?.RoomNumber,
      hotelName: b.hotelName || b.HotelName || b.hotel?.name || b.Hotel?.Name,
      checkInDate: b.checkInDate || b.CheckInDate,
      checkOutDate: b.checkOutDate || b.CheckOutDate,
      totalAmount: b.totalAmount || b.TotalAmount || b.price || 0,
      status: b.status || b.Status || 'Pending',
      specialRequests: b.specialRequests || b.SpecialRequests,
      createdAt: b.createdAt || b.CreatedAt
    };
  }

  // ✅ Create booking
  createBooking(booking: CreateBooking): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }

  // ✅ Get current user bookings
  getMyBookings(): Observable<Booking[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-bookings`).pipe(
      map(res => res.map(b => this.mapBooking(b)))
    );
  }

  // ✅ Admin: Get all bookings
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(res => res.map(b => this.mapBooking(b)))
    );
  }

  // ✅ Admin: Update booking status
  updateBookingStatus(dto: UpdateBookingStatus): Observable<any> {
    return this.http.put(`${this.apiUrl}/status`, dto);
  }
}

