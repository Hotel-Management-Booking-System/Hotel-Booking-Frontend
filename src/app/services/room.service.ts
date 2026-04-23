import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Room, CreateRoom } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  // 🔐 JWT Header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🔄 Normalize response
  private mapRoom(r: any): Room {
    return {
      id: r.id || r.Id,
      hotelId: r.hotelId || r.HotelId || 0,
      hotelName: r.hotelName || r.HotelName || '',
      roomNumber: r.roomNumber || r.RoomNumber || '',
      roomType: r.roomType || r.RoomType,
      price: Number(r.price ?? r.Price ?? r.pricePerNight ?? r.PricePerNight ?? 0),
      capacity: Number(r.capacity ?? r.Capacity ?? r.maxOccupancy ?? r.MaxOccupancy ?? 1),
      description: r.description || r.Description || '',
      imageUrl: r.imageUrl || r.ImageUrl || '',
      isAvailable: r.isAvailable ?? r.IsAvailable
    };
  }

  // ✅ Get all rooms (Admin)
  getAllRooms(): Observable<Room[]> {
    return this.http.get<any[]>(`${this.roomsUrl}/all`, {
      headers: this.getHeaders()
    }).pipe(
      map(res => res.map(r => this.mapRoom(r)))
    );
  }

  // ✅ Get rooms by hotel
  getRoomsByHotel(hotelId: number): Observable<Room[]> {
    return this.http.get<any[]>(`${this.roomsUrl}/hotel/${hotelId}`).pipe(
      map(res => res.map(r => this.mapRoom(r)))
    );
  }

  // ✅ Get single room
  getRoomById(roomId: number): Observable<Room> {
    return this.http.get<any>(`${this.roomsUrl}/${roomId}`).pipe(
      map(r => this.mapRoom(r))
    );
  }

  // ✅ Create room
  createRoom(room: CreateRoom): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, {
      headers: this.getHeaders()
    });
  }

  // ✅ Update room
  updateRoom(roomId: number, room: CreateRoom): Observable<Room> {
    return this.http.put<Room>(`${this.roomsUrl}/${roomId}`, room, {
      headers: this.getHeaders()
    });
  }

  // ✅ Delete room
  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete(`${this.roomsUrl}/${roomId}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
