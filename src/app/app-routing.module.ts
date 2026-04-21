import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all components
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

// Import guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

// Define all application routes
const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes (no login required)
  { path: 'home',     component: HomeComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hotels',   component: HotelsComponent },

  // hotelId is a URL parameter (e.g. /rooms/3)
  { path: 'rooms/:hotelId', component: RoomsComponent },

  // Protected routes - user must be logged in
  {
    path: 'bookings/:hotelId/:roomId',
    component: BookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [AuthGuard]
  },

  // Admin-only routes - must be logged in AND have role 'Admin'
  {
    path: 'admin/manage-hotels',
    component: ManageHotelsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: '1' }
  },
  {
    path: 'admin/manage-rooms',
    component: ManageRoomsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: '1' }
  },
  {
    path: 'admin/manage-bookings',
    component: ManageBookingsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: '1' }
  },
  {
    path: 'admin/promotions',
    component: PromotionsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: '1' }
  },

  // Catch-all wildcard - redirect unknown routes to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
