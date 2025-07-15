import { Component, inject, signal, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { ExamService } from '../../../core/services/exam-service';
import { Header } from "../../shared/header/header";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [AsyncPipe, Header],
  standalone: true
})
export class AdminDashboard implements OnInit {
  private examService = inject(ExamService);
  adminName: string = '';
  examsCount$!: Observable<number>; // Async pipe (automatically subscribe and unsubscribe to the observable)
  questionsCount$!: Observable<number>;

  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    const token = this.tokenStorage.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.adminName = decoded?.sub || decoded?.UserName || 'Admin';
      this.examsCount$ = this.examService.getExamsCount();
      this.questionsCount$ = this.examService.getQuestionsCount();
    }
  }

  goToViewExams(): void {
    this.router.navigate(['/exam']);
  }

  logout(): void {
    this.tokenStorage.clear();
    this.router.navigate(['/login']);
  }

}
