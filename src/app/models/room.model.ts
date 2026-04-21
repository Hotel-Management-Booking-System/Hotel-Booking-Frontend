// Represents a room inside a hotel
export interface Room {
  id: number;
  hotelId: number;
  hotelName: string;
  roomNumber: string;
  roomType: string;         // e.g. Single, Double, Suite
  pricePerNight: number;
  maxOccupancy: number;
  description: string;
  features: string;         // Backend uses comma-separated string
  imageUrl: string;
  isAvailable: boolean;
}

// Used when creating or updating a room
export interface CreateRoom {
  hotelId: number;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  maxOccupancy: number;
  description: string;
  features: string;
  imageUrl: string;
  isAvailable: boolean;
}
