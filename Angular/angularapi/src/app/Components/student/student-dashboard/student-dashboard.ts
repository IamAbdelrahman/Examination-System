import { Component } from '@angular/core';
import { Header } from "../../shared/header/header";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  imports: [Header,RouterModule ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
  standalone: true
})
export class StudentDashboard {

}
