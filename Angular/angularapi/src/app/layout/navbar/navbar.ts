import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  title = 'Examination System';

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
