// Represents a booking made by a user
export interface Booking {
  id: number;
  userId: number;
  userName?: string;
  roomId: number;
  roomNumber?: string;
  hotelName?: string;
  checkInDate: string;      // ISO date string
  checkOutDate: string;     // ISO date string
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  specialRequests?: string;
  createdAt?: string;
  promotionId?: number;
}

// Used when creating a new booking
export interface CreateBooking {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
  promotionId?: number;
}

// Used when updating booking status (admin)
export interface UpdateBookingStatus {
  bookingId: number;
  status: string;
}
