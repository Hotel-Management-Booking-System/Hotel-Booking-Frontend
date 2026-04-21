import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';

// Rooms component - shows rooms available in a specific hotel.
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];
  hotelId: number = 0;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the hotelId from the URL (e.g. /rooms/3)
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.loadRooms();
  }

  loadRooms(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.roomService.getRoomsByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.rooms = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load rooms. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Navigate to the booking form for a selected room
  bookRoom(roomId: number): void {
    this.router.navigate(['/bookings', roomId]);
  }
}
