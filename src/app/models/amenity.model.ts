// Represents a single amenity (e.g. WiFi, Pool, Gym)
export interface Amenity {
  id: number;
  name: string;
  icon?: string;    // optional icon class or emoji
  description?: string;
}
