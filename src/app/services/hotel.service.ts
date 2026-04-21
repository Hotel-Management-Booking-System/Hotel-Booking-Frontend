import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Hotel, CreateHotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = `${environment.apiUrl}/hotels`;

  constructor(private http: HttpClient) { }

  // 🔐 JWT Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🔥 Normalize response types
  private mapHotel(h: any): Hotel {
    let amenities: string[] = [];
    
    if (typeof h.amenities === 'string') {
      amenities = h.amenities.split(',').map((a: string) => a.trim()).filter((a: string) => a.length > 0);
    } else if (Array.isArray(h.amenities)) {
      amenities = typeof h.amenities[0] === 'string'
        ? h.amenities
        : h.amenities.map((a: any) => a.name || a.toString());
    }

    return {
      id: h.id,
      name: h.name,
      description: h.description,
      location: h.location,
      city: h.city,
      country: h.country,
      starRating: h.starRating,
      phoneNumber: h.phoneNumber,
      email: h.email,
      imageUrl: h.imageUrl,
      amenities: amenities,
      totalRooms: h.totalRooms,
      availableRooms: h.availableRooms,
      lowestPrice: h.lowestPrice
    };
  }

  // ✅ GET ALL
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => res.map(h => this.mapHotel(h)))
    );
  }

  // ✅ GET BY ID
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(h => this.mapHotel(h))
    );
  }

  // ✅ SEARCH
  searchHotelsByCity(city: string): Observable<Hotel[]> {
    let params = new HttpParams().set('city', city);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
      map(res => res.map(h => this.mapHotel(h)))
    );
  }

  // 🛠 ADMIN: Create
  createHotel(hotel: CreateHotel): Observable<Hotel> {
    return this.http.post<any>(this.apiUrl, hotel, {
      headers: this.getHeaders()
    }).pipe(
      map(h => this.mapHotel(h))
    );
  }

  // 🛠 ADMIN: Update
  updateHotel(id: number, hotel: CreateHotel): Observable<Hotel> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hotel, {
      headers: this.getHeaders()
    }).pipe(
      map(h => this.mapHotel(h))
    );
  }

  // 🛠 ADMIN: Delete
  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 🛠 ADMIN: Add Amenity
  addAmenity(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/amenity`, { name }, {
      headers: this.getHeaders()
    });
  }
}