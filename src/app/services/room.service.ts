import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room, CreateRoom } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `${environment.apiUrl}/hotels`; // Base is hotels for nested routes
  private globalRoomsUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  // 🔐 JWT Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Get all rooms for a specific hotel
  getRoomsByHotel(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/${hotelId}/rooms`);
  }

  // Get a single room by ID
  getRoomById(hotelId: number, roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${hotelId}/rooms/${roomId}`);
  }

  // Get available rooms for given dates and guests
  getAvailableRooms(hotelId: number, checkIn: string, checkOut: string, guests: number): Observable<Room[]> {
    let params = new HttpParams()
      .set('checkInDate', checkIn)
      .set('checkOutDate', checkOut)
      .set('numberOfGuests', guests.toString());

    return this.http.get<Room[]>(`${this.apiUrl}/${hotelId}/rooms/search`, { params });
  }

  // Admin: Get all rooms across all hotels
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.globalRoomsUrl, {
      headers: this.getHeaders()
    });
  }

  // Admin: Create a new room
  createRoom(hotelId: number, room: CreateRoom): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/${hotelId}/rooms`, room, {
      headers: this.getHeaders()
    });
  }

  // Admin: Update a room
  updateRoom(hotelId: number, roomId: number, room: CreateRoom): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${hotelId}/rooms/${roomId}`, room, {
      headers: this.getHeaders()
    });
  }

  // Admin: Delete a room
  deleteRoom(hotelId: number, roomId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${hotelId}/rooms/${roomId}`, {
      headers: this.getHeaders()
    });
  }
}
