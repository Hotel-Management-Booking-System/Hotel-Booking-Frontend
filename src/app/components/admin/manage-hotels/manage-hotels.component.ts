import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../services/hotel.service';
import { Hotel, CreateHotel } from '../../../models/hotel.model';

// Admin: Manage Hotels - full CRUD for hotels.
@Component({
  selector: 'app-manage-hotels',
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.css']
})
export class ManageHotelsComponent implements OnInit {

  hotels: Hotel[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  // Controls whether the create/edit form is shown
  showForm: boolean = false;
  isEditing: boolean = false;
  editingHotelId: number = 0;

  // The form model for creating/editing a hotel
  hotelForm: CreateHotel = this.getEmptyForm();

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  // Return a blank hotel form object
  getEmptyForm(): CreateHotel {
    return {
      name: '',
      description: '',
      location: '',
      city: '',
      country: '',
      starRating: 3,
      phoneNumber: '',
      email: '',
      amenities: '',
      imageUrl: ''
    };
  }

  loadHotels(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load hotels.';
        this.isLoading = false;
      }
    });
  }

  // Open the form for creating a new hotel
  openCreateForm(): void {
    this.hotelForm = this.getEmptyForm();
    this.isEditing = false;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Open the form pre-filled for editing
  openEditForm(hotel: Hotel): void {
    this.hotelForm = {
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      city: hotel.city,
      country: hotel.country,
      starRating: hotel.starRating,
      phoneNumber: hotel.phoneNumber,
      email: hotel.email,
      amenities: hotel.amenities.join(', '),
      imageUrl: hotel.imageUrl
    };
    this.editingHotelId = hotel.id;
    this.isEditing = true;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForm(): void {
    this.showForm = false;
  }

  // Save - either create or update based on isEditing flag
  saveHotel(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditing) {
      this.hotelService.updateHotel(this.editingHotelId, this.hotelForm).subscribe({
        next: () => {
          this.successMessage = 'Hotel updated successfully.';
          this.showForm = false;
          this.loadHotels();
        },
        error: () => {
          this.errorMessage = 'Failed to update hotel.';
        }
      });
    } else {
      this.hotelService.createHotel(this.hotelForm).subscribe({
        next: () => {
          this.successMessage = 'Hotel created successfully.';
          this.showForm = false;
          this.loadHotels();
        },
        error: () => {
          this.errorMessage = 'Failed to create hotel.';
        }
      });
    }
  }

  deleteHotel(id: number): void {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    this.hotelService.deleteHotel(id).subscribe({
      next: () => {
        this.successMessage = 'Hotel deleted successfully.';
        this.hotels = this.hotels.filter(h => h.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete hotel.';
      }
    });
  }
}
