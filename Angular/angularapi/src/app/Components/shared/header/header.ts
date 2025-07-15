import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface User {
  name: string;
  role: string;
  [key: string]: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  studentNavItems: any[] = [];
  adminNavItems: any[] = [];
user = computed<User | null>(() => {
    if (!this.isLoggedIn()) {
      return null;
    }
    try {
      const token = localStorage.getItem('exam-token');
      if (!token) return null;
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.sub);
      return {
        name: decodedToken.sub,
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      };
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      this.logout(); // If the token is invalid, treat the user as logged out.
      return null;
    }
  });
  ngOnInit() {
    this.studentNavItems = [
      { label: 'Dashboard', route: '/student-dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/student/exams', icon: 'quiz' },
      { label: 'Results', route: '/student/results', icon: 'assessment' },
      { label: this.user()?.name, icon: 'Name'}
    ];

    this.adminNavItems = [
      { label: 'Dashboard', route: '/admin-dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/exam', icon: 'quiz' },
      { label: this.user()?.name, icon: 'Name'}
    ];
  }
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isLoggedIn: Signal<boolean> = computed(() => {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('exam-token');
    }
    return false;
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


