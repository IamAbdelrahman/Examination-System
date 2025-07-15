import { StudentResults } from './../student-restults/student-restults';
import { Component, inject, signal, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { ExamService } from '../../../core/services/exam-service';
import { Header } from "../../shared/header/header";
import { RouterModule } from '@angular/router';
import { Footer } from "../../shared/footer/footer";

@Component({
  selector: 'app-student-dashboard',
  imports: [Header, RouterModule, Footer],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
  standalone: true
})
export class StudentDashboard {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }
  goToTakeExams(): void {
    this.router.navigate(['student/exams']);
  }
  logout(): void {
    this.tokenStorage.clear();
  }
}
