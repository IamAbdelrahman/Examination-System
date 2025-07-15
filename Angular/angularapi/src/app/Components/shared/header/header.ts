import { CommonModule } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, Signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// Define a simple user model. In a real app, this would likely be in its own file.
interface User {
  name: string;
  role: string;
  // You can add other properties from the token here
  [key: string]: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // In a real-world application, this logic would be encapsulated in an AuthService
  // and the component would simply inject that service.
  // This implementation uses localStorage and jwt-decode for a self-contained example.

  isLoggedIn: Signal<boolean> = computed(() => {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('exam-token');
    }
    return false;
  });

  user = computed<User | null>(() => {
    if (!this.isLoggedIn()) {
      return null;
    }
    try {
      const token = localStorage.getItem('exam-token');
      if (!token) return null;

      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.sub);
      const roles: string[] = JSON.parse(decodedToken.roles);
      console.log(roles[0]);
      return {
        name: decodedToken.sub,
        role: roles[0]
      };
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      this.logout(); // If the token is invalid, treat the user as logged out.
      return null;
    }
  });

  getInitials(name: string | undefined | null): string {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('exam-token');
    }
    this.router.navigate(['/login']);
  }
}
