import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  login() {
    this.http.post<any>('https://localhost:44301/api/Auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.tokenStorage.saveToken(res.token);
        const decoded: any = jwtDecode(res.token);
        const roles: string[] = JSON.parse(decoded.roles);

        console.log(roles); // ✅ ["Admin"]
        console.log(roles[0]); // ✅ "Admin"
        console.log(decoded);
        if (roles.includes('Admin')) this.router.navigate(['/exam']);
        else this.router.navigate(['/exam-details']);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
      }
    });
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}