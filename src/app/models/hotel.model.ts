export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;

  // Optional (comes only in details/search)
  location?: string;
  description?: string;
  imageUrl?: string;

  // Normalized amenities
  amenities: string[];
}