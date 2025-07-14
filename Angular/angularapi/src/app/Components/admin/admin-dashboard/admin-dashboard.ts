import { Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  adminName: string = '';

  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    const token = this.tokenStorage.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.adminName = decoded?.sub || decoded?.UserName || 'Admin';
    }
  }

  goToViewExams(): void {
    this.router.navigate(['/exam']);
  }

  goToCreateExam(): void {
    this.router.navigate(['/exam/create']);
  }
}
