import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hotel, CreateHotel } from '../models/hotel.model';

// HotelService handles all API calls related to hotels (read + admin CRUD).
@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = `${environment.apiUrl}/hotels`;

  constructor(private http: HttpClient) {}

  // Get all hotels (public)
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  // Get a single hotel by its ID
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  // Search hotels by city
  searchHotelsByCity(city: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}?city=${city}`);
  }

  // Admin: Create a new hotel
  createHotel(hotel: CreateHotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  // Admin: Update an existing hotel
  updateHotel(id: number, hotel: CreateHotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, hotel);
  }

  // Admin: Delete a hotel
  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
