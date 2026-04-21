// Represents a user in the system (guest or admin)
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Admin' | 'User';
  createdAt?: string;
}

// Used for login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Used for registration request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// Response from the server after successful login
export interface AuthResponse {
  token: string;
  role: string;
  email: string;
  userId: number;
  firstName: string;
  lastName: string;
}
