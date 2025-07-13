import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})


export class Header {
  constructor(private router: Router) {}

  // navigateTo(label: string) {
  //   this.router.navigate(['/' + label]);
  // }
      get defaultNavItems() {
    return [
      {label: 'Home', route: '/home', icon: 'home'},
      {label: 'Login', route: '/login', icon: 'login'},
      {label: 'Register', route: '/register', icon: 'person_add'},

    ]}
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
