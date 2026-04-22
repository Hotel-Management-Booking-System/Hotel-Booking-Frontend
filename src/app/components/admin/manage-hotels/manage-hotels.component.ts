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
  availableAmenities: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  newAmenityName: string = '';

  // Controls whether the create/edit form is shown
  showForm: boolean = false;
  isEditing: boolean = false;
  editingHotelId: number = 0;
  isDropdownOpen: boolean = false;

  // The form model for creating/editing a hotel
  hotelForm: CreateHotel = this.getEmptyForm();

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
    this.loadAmenities();
  }

  loadAmenities(): void {
    this.hotelService.getAllAmenities().subscribe({
      next: (data) => {
        this.availableAmenities = data;
      },
      error: () => {
        console.error('Failed to load amenities');
      }
    });
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
      amenityIds: [],
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
    this.isDropdownOpen = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Open the form pre-filled for editing
  openEditForm(hotel: Hotel): void {
    const selectedIds = this.availableAmenities
      .filter(a => hotel.amenities.includes(a.name))
      .map(a => a.id);

    this.hotelForm = {
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      city: hotel.city,
      country: hotel.country,
      starRating: hotel.starRating,
      phoneNumber: hotel.phoneNumber,
      email: hotel.email,
      amenityIds: selectedIds,
      imageUrl: hotel.imageUrl
    };
    this.editingHotelId = hotel.id;
    this.isEditing = true;
    this.showForm = true;
    this.isDropdownOpen = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForm(): void {
    this.showForm = false;
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleAmenity(amenityId: number, event: Event): void {
    event.stopPropagation();
    const index = this.hotelForm.amenityIds.indexOf(amenityId);
    if (index > -1) {
      this.hotelForm.amenityIds.splice(index, 1);
    } else {
      this.hotelForm.amenityIds.push(amenityId);
    }
  }

  getSelectedAmenitiesText(): string {
    if (!this.hotelForm.amenityIds || this.hotelForm.amenityIds.length === 0) {
      return 'Select Amenities...';
    }
    const selectedNames = this.availableAmenities
      .filter(a => this.hotelForm.amenityIds.includes(a.id))
      .map(a => a.name);
    
    if (selectedNames.length > 3) {
      return `${selectedNames.length} amenities selected`;
    }
    return selectedNames.join(', ');
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

  addAmenity(): void {
    if (!this.newAmenityName.trim()) return;
    this.hotelService.addAmenity(this.newAmenityName).subscribe({
      next: () => {
        this.newAmenityName = '';
        this.loadAmenities();
        this.successMessage = 'Amenity added successfully.';
      },
      error: () => {
        this.errorMessage = 'Failed to add amenity.';
      }
    });
  }
}
