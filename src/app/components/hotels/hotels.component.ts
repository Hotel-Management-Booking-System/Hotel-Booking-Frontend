import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';

// Hotels component - shows a list of all hotels with search by city.
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: Hotel[] = [];         // List of hotels loaded from API
  searchCity: string = '';       // City search input
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load all hotels when the page opens
    this.loadHotels();
  }

  loadHotels(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load hotels. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Search hotels by the entered city
  searchHotels(): void {
    if (!this.searchCity.trim()) {
      this.loadHotels();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.hotelService.searchHotelsByCity(this.searchCity).subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Search failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Navigate to the rooms page for the selected hotel
  viewRooms(hotelId: number): void {
    this.router.navigate(['/rooms', hotelId]);
  }
}
