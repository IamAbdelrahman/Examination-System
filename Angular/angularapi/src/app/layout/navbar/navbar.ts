import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
    get studentNavItems() {
    return [
      { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/exams', icon: 'quiz' },
      { label: 'Results', route: '/results', icon: 'assessment' },
      { label: 'Profile', route: '/profile', icon: 'person' }
    ];
  }

  get adminNavItems() {
    return [
      { label: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/admin/exams', icon: 'quiz' },
      { label: 'Questions', route: '/admin/questions', icon: 'help' },
      { label: 'Students', route: '/admin/students', icon: 'group' },
      { label: 'Results', route: '/admin/results', icon: 'assessment' },
      { label: 'Profile', route: '/profile', icon: 'person' }
    ];
  }

}
