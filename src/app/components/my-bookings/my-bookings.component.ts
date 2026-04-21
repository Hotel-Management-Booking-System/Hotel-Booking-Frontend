import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
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

  constructor(private bookingService: BookingService) {}

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
      error: () => {
        this.errorMessage = 'Failed to load your bookings.';
        this.isLoading = false;
      }
    });
  }

}
