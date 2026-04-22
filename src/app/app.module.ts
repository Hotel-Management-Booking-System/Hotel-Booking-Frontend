import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';             // For [(ngModel)] - template-driven forms
import { CommonModule } from '@angular/common';            // For *ngIf, *ngFor, pipes
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // For HTTP calls

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavbarComponent }         from './components/navbar/navbar.component';
import { HomeComponent }           from './components/home/home.component';
import { LoginComponent }          from './components/login/login.component';
import { RegisterComponent }       from './components/register/register.component';
import { HotelsComponent }         from './components/hotels/hotels.component';
import { RoomsComponent }          from './components/rooms/rooms.component';
import { BookingsComponent }       from './components/bookings/bookings.component';
import { MyBookingsComponent }     from './components/my-bookings/my-bookings.component';
import { ManageHotelsComponent }   from './components/admin/manage-hotels/manage-hotels.component';
import { ManageRoomsComponent }    from './components/admin/manage-rooms/manage-rooms.component';
import { ManageBookingsComponent } from './components/admin/manage-bookings/manage-bookings.component';
import { PromotionsComponent }     from './components/admin/promotions/promotions.component';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ManageAmenitiesComponent } from './components/admin/manage-amenities/manage-amenities.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HotelsComponent,
    RoomsComponent,
    BookingsComponent,
    MyBookingsComponent,
    ManageHotelsComponent,
    ManageRoomsComponent,
    ManageBookingsComponent,
    PromotionsComponent,
    ManageAmenitiesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,          // Enables ngModel template-driven forms
    HttpClientModule,     // Enables HttpClient for API calls
    AppRoutingModule
  ],
  providers: [
    // Register the JWT interceptor globally
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   // 'multi: true' means we can have multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
