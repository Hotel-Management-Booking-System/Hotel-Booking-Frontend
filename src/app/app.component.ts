import { Component } from '@angular/core';

// Root component - the entry point of the application.
// It renders the navbar and the router outlet (which shows the current route's component).
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StayEase Hotel Booking';
}
