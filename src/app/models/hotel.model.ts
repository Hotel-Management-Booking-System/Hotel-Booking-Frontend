export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  city: string;
  country: string;
  starRating: number;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  amenities: string[]; // Normalized in service
  
  // Optional stats
  totalRooms?: number;
  availableRooms?: number;
  lowestPrice?: number;
}

export interface CreateHotel {
  name: string;
  description: string;
  location: string;
  city: string;
  country: string;
  starRating: number;
  phoneNumber: string;
  email: string;
  amenities: string; // Backend expects string
  imageUrl: string;
}