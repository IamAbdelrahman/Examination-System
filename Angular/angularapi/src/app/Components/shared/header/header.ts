import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  studentNavItems: any[] = [];
  adminNavItems: any[] = [];

  ngOnInit() {
    this.studentNavItems = [
      { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/exam', icon: 'quiz' },
      { label: 'Results', route: '/results', icon: 'assessment' },
      { label: 'Profile', route: '/profile', icon: 'person' }
    ];

    this.adminNavItems = [
      { label: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
      { label: 'Exams', route: '/admin/exam', icon: 'quiz' },
      { label: 'Questions', route: '/admin/questions', icon: 'help' },
      { label: 'Students', route: '/admin/students', icon: 'group' },
      { label: 'Results', route: '/admin/results', icon: 'assessment' },
      { label: 'Profile', route: '/profile', icon: 'person' }
    ];
  }
}
