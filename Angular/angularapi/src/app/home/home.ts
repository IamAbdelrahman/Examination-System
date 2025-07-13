import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { SharedModule } from '../modules/shared/shared-module';
import { Header } from '../modules/shared/components/header/header';
import { Footer } from '../modules/shared/components/footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    Header,Footer
  ]
})
export class Home implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    // Any initialization logic can go here
    console.log('Home component initialized');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

    navigateToLogin() {
    this.router.navigate(['/login']).catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']).catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  navigateToExams() {
    this.router.navigate(['/exams']).catch(error => {
      console.error('Navigation failed:', error);
    });
  }
}