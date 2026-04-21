import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room, CreateRoom } from '../models/room.model';

// RoomService handles all API calls related to rooms.
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  // Get all rooms for a specific hotel
  getRoomsByHotel(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  // Get a single room by ID
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  // Get all available rooms (for booking page)
  getAvailableRooms(hotelId: number, checkIn: string, checkOut: string): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${this.apiUrl}/available?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  }

  // Admin: Get all rooms across all hotels
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Admin: Create a new room
  createRoom(room: CreateRoom): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  // Admin: Update a room
  updateRoom(id: number, room: CreateRoom): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }

  // Admin: Delete a room
  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
