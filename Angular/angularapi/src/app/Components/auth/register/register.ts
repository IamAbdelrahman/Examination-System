// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  constructor(private router: Router) {}

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

    // Your registration logic here
    console.log('Registration data:', {
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password
    });

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = 'Account created successfully! Please check your email.';
      // Redirect to login after success
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 2000);
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