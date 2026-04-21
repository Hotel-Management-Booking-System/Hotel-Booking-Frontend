import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = `${environment.apiUrl}/hotels`;

  constructor(private http: HttpClient) { }

  // 🔐 JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🔥 Normalize BOTH response types
  private mapHotel(h: any): Hotel {
    return {
      id: h.id,
      name: h.name,
      city: h.city,
      country: h.country,
      location: h.location,
      description: h.description,
      imageUrl: h.imageUrl,

      // ✅ Handle BOTH formats
      amenities: Array.isArray(h.amenities)
        ? (typeof h.amenities[0] === 'string'
          ? h.amenities
          : h.amenities.map((a: any) => a.name))
        : []
    };
  }

  // ✅ GET ALL
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders()
    }).pipe(
      map(res => res.map(h => this.mapHotel(h)))
    );
  }

  // ✅ GET BY ID
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(h => this.mapHotel(h))
    );
  }

  // ✅ SEARCH
  searchHotels(city: string): Observable<Hotel[]> {
    let params = new HttpParams().set('city', city);

    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      headers: this.getHeaders(),
      params
    }).pipe(
      map(res => res.map(h => this.mapHotel(h)))
    );
  }
}