import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class RegisterComponent {
  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeTerms: boolean = false;
  error: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  isHidden: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (!this.agreeTerms) {
      this.error = 'You must agree to the terms and conditions';
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.successMessage = '';

    const model = {
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password
    };

    this.authService.register(model).subscribe({
      next: (res) => {
        this.successMessage = 'Account created successfully!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  getPasswordStrength(): string {
    if (!this.password) return '';

    const strength = this.calculatePasswordStrength(this.password);
    if (strength < 30) return 'weak';
    if (strength < 70) return 'medium';
    return 'strong';
  }

  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  }
}
