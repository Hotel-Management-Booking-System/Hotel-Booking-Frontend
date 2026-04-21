import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { HotelService } from '../../../services/hotel.service';
import { Room, CreateRoom } from '../../../models/room.model';
import { Hotel } from '../../../models/hotel.model';

// Admin: Manage Rooms - full CRUD for rooms across all hotels.
@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.css']
})
export class ManageRoomsComponent implements OnInit {

  rooms: Room[] = [];
  hotels: Hotel[] = [];    // For the dropdown in the form
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  showForm: boolean = false;
  isEditing: boolean = false;
  editingRoomId: number = 0;

  roomForm: CreateRoom = this.getEmptyForm();

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadHotels();
  }

  getEmptyForm(): CreateRoom {
    return {
      hotelId: 0,
      roomNumber: '',
      roomType: '',
      pricePerNight: 0,
      maxOccupancy: 1,
      description: '',
      imageUrl: '',
      isAvailable: true
    };
  }

  loadRooms(): void {
    this.isLoading = true;

    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load rooms.';
        this.isLoading = false;
      }
    });
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: () => {
        // Non-critical, just log
        console.error('Could not load hotels for dropdown');
      }
    });
  }

  openCreateForm(): void {
    this.roomForm = this.getEmptyForm();
    this.isEditing = false;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  openEditForm(room: Room): void {
    this.roomForm = {
      hotelId: room.hotelId,
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      maxOccupancy: room.maxOccupancy,
      description: room.description,
      imageUrl: room.imageUrl,
      isAvailable: room.isAvailable
    };
    this.editingRoomId = room.id;
    this.isEditing = true;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveRoom(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditing) {
      this.roomService.updateRoom(this.editingRoomId, this.roomForm).subscribe({
        next: () => {
          this.successMessage = 'Room updated successfully.';
          this.showForm = false;
          this.loadRooms();
        },
        error: () => {
          this.errorMessage = 'Failed to update room.';
        }
      });
    } else {
      this.roomService.createRoom(this.roomForm).subscribe({
        next: () => {
          this.successMessage = 'Room created successfully.';
          this.showForm = false;
          this.loadRooms();
        },
        error: () => {
          this.errorMessage = 'Failed to create room.';
        }
      });
    }
  }

  deleteRoom(id: number): void {
    if (!confirm('Delete this room?')) return;

    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        this.successMessage = 'Room deleted.';
        this.rooms = this.rooms.filter(r => r.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete room.';
      }
    });
  }
}
