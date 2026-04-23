import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Booking } from '../../models/booking.model';

// My Bookings component - shows the current user's booking history.
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.bookings = [];
        } else {
          this.errorMessage = 'Failed to load your bookings. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }

  onCancelBooking(bookingId: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.isLoading = true;
    this.bookingService.updateBookingStatus({ bookingId, status: 'Cancelled' }).subscribe({
      next: () => {
        this.successMessage = 'Booking cancelled successfully.';
        this.loadMyBookings();
      },
      error: () => {
        this.errorMessage = 'Failed to cancel the booking. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onRebook(booking: Booking): void {
    const hotelId = booking.hotelId || 0;
    this.router.navigate(['/bookings', hotelId, booking.roomId]); 
  }
}
