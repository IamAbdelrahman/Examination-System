import { Component, inject, OnInit, signal } from '@angular/core';
import { ResultDetailsService, StudentResultDetailsDto } from '../../../core/services/StudentServices/result-details-service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './result-details.html',
  styleUrls: ['./result-details.css']
})
export class ResultDetails implements OnInit {
  private resultDetailsService = inject(ResultDetailsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  result = signal<StudentResultDetailsDto | null>(null);
  loading = signal(true);
  error = signal<string>('');

  ngOnInit() {
    const resultId = this.route.snapshot.params['id'];
    this.loadResultDetails(resultId);
  }

  loadResultDetails(resultId: number) {
    this.loading.set(true);
    this.error.set('');

    this.resultDetailsService.getResultDetails(resultId).subscribe({
      next: (result) => {
        this.result.set(result);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = typeof err.error === 'object' && err.error !== null 
          ? (err.error.message || err.error.title || 'An unknown error occurred')
          : 'An error occurred while loading the result';
        
        this.error.set(errorMessage);
        this.loading.set(false);
      }
    });
  }

  returnToList() {
    this.router.navigate(['/student/results']);
  }

  getScoreClass(): string {
    const percentage = this.result()?.percentage ?? 0;
    return percentage >= 70 ? 'pass' : 'fail';
  }
}