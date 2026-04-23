// Represents a room inside a hotel
export interface Room {
  id: number;
  hotelId: number;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  price: number;            // Matches 'Price' in backend
  capacity: number;         // Matches 'Capacity' in backend
  description: string;
  imageUrl: string;
  isAvailable: boolean;
}

// Used when creating or updating a room
export interface CreateRoom {
  hotelId: number;
  roomNumber: string;
  roomType: string;
  price: number;
  capacity: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
}
