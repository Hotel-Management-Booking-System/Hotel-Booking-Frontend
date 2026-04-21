import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Booking, UpdateBookingStatus } from '../../../models/booking.model';

// Admin: Manage Bookings - view all bookings and update their status.
@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  // Available status options for the dropdown
  statusOptions: string[] = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load bookings.';
        this.isLoading = false;
      }
    });
  }

  // Change the status of a booking
  updateStatus(bookingId: number, newStatus: string): void {
    const payload: UpdateBookingStatus = { bookingId, status: newStatus };

    this.bookingService.updateBookingStatus(payload).subscribe({
      next: () => {
        this.successMessage = 'Booking status updated.';
        // Update in the list
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.status = newStatus as any;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to update booking status.';
      }
    });
  }

}
