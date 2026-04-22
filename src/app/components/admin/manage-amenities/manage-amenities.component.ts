import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-manage-amenities',
  templateUrl: './manage-amenities.component.html',
  styleUrls: ['./manage-amenities.component.css']
})
export class ManageAmenitiesComponent implements OnInit {
  amenities: any[] = [];
  newAmenityName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadAmenities();
  }

  loadAmenities(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.hotelService.getAllAmenities().subscribe({
      next: (data) => {
        this.amenities = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load amenities.';
        this.isLoading = false;
      }
    });
  }

  addAmenity(): void {
    if (!this.newAmenityName.trim()) {
      this.errorMessage = 'Amenity name cannot be empty.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.hotelService.addAmenity(this.newAmenityName.trim()).subscribe({
      next: () => {
        this.successMessage = `Amenity "${this.newAmenityName}" added successfully.`;
        this.newAmenityName = '';
        this.loadAmenities();
      },
      error: () => {
        this.errorMessage = 'Failed to add amenity.';
        this.isLoading = false;
      }
    });
  }
}
