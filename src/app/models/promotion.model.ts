// Represents a promotional discount
export interface Promotion {
  id: number;
  code: string;             // promo code entered by user
  description: string;
  discountPercent: number;  // e.g. 20 for 20% off
  startDate: string;        // ISO date
  endDate: string;          // ISO date
  isActive: boolean;
}

// Used when creating or updating a promotion
export interface CreatePromotion {
  code: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
