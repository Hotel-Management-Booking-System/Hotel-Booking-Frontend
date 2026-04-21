import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { CreateBooking } from '../../models/booking.model';
import { Room } from '../../models/room.model';
import { Promotion } from '../../models/promotion.model';

// Bookings component - form for creating a new booking.
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  // The booking form data
  bookingData: CreateBooking = {
    roomId: 0,
    checkInDate: '',
    checkOutDate: '',
    specialRequests: '',
    promotionId: undefined
  };

  room: Room | null = null;         // The room being booked
  promoCode: string = '';           // Promo code input
  appliedPromo: Promotion | null = null;  // Applied promo
  totalAmount: number = 0;          // Calculated total
  nights: number = 0;               // Number of nights
  hotelId: number = 0;

  errorMessage: string = '';
  successMessage: string = '';
  promoError: string = '';
  isLoading: boolean = false;

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read IDs from URL (api/bookings/:hotelId/:roomId)
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.bookingData.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.loadRoom();
  }

  loadRoom(): void {
    this.roomService.getRoomById(this.hotelId, this.bookingData.roomId).subscribe({
      next: (data) => {
        this.room = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load room details.';
      }
    });
  }

  // Recalculate total when dates change
  calculateTotal(): void {
    if (this.bookingData.checkInDate && this.bookingData.checkOutDate && this.room) {
      const checkIn = new Date(this.bookingData.checkInDate);
      const checkOut = new Date(this.bookingData.checkOutDate);

      // Calculate number of nights
      const diffTime = checkOut.getTime() - checkIn.getTime();
      this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (this.nights > 0) {
        this.totalAmount = this.nights * this.room.pricePerNight;

        // Apply discount if promo is applied
        if (this.appliedPromo) {
          const discount = (this.totalAmount * this.appliedPromo.discountPercent) / 100;
          this.totalAmount = this.totalAmount - discount;
        }
      }
    }
  }

  // Apply a promo code entered by user
  applyPromo(): void {
    this.promoError = '';
    this.appliedPromo = null;

    if (!this.promoCode.trim()) {
      this.promoError = 'Please enter a promo code.';
      return;
    }

    this.userService.validatePromoCode(this.promoCode).subscribe({
      next: (promo) => {
        this.appliedPromo = promo;
        this.bookingData.promotionId = promo.id;
        this.calculateTotal();  // Recalculate with discount
      },
      error: () => {
        this.promoError = 'Invalid or expired promo code.';
      }
    });
  }

  // Submit the booking
  onBook(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.nights <= 0) {
      this.errorMessage = 'Check-out date must be after check-in date.';
      return;
    }

    this.isLoading = true;

    this.bookingService.createBooking(this.bookingData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Booking confirmed! Redirecting to My Bookings...';
        setTimeout(() => {
          this.router.navigate(['/my-bookings']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Booking failed. Please try again.';
      }
    });
  }
}
