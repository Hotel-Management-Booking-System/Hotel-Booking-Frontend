import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

// This interceptor automatically adds the JWT token to every HTTP request.
// It reads the token from localStorage and sets it in the Authorization header.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Read the token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Clone the request and add the Authorization header
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      // Pass the modified request forward
      return next.handle(clonedRequest);
    }

    // No token - pass the request as-is
    return next.handle(request);
  }
}
