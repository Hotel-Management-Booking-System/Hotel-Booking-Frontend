// Represents a hotel in the system
export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  starRating: number;       // 1 to 5
  imageUrl: string;
  contactEmail: string;
  contactPhone: string;
  amenityIds?: number[];    // list of amenity IDs
  isActive: boolean;
}

// Used when creating or updating a hotel
export interface CreateHotel {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  starRating: number;
  imageUrl: string;
  contactEmail: string;
  contactPhone: string;
  amenityIds?: number[];
  isActive: boolean;
}
