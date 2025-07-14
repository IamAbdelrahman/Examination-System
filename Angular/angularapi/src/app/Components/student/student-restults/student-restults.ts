import { Component, inject, signal } from '@angular/core';
import { StudentResultService, StudentResultSummaryDto } from '../../../core/services/StudentServices/student-result-service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
 templateUrl: './student-restults.html',
styleUrls: ['./student-restults.css'],
})
export class StudentResults {
  private resultService = inject(StudentResultService);

  results = signal<StudentResultSummaryDto[]>([]);
  currentPage = signal(1);
  pageSize = 10;
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    this.loadResults();
  }

  loadResults() {
    this.loading.set(true);
    this.error.set('');

    this.resultService.getMyResults(this.currentPage(), this.pageSize).subscribe({
      next: (results) => {
        this.results.set(results);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    this.currentPage.update(p => p + 1);
    this.loadResults();
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadResults();
    }
  }

  getScoreClass(percentage: number): string {
    return percentage >= 70 ? 'passing' : 'failing';
  }

  getResultIcon(percentage: number): string {
    return percentage >= 70 ? '🏆' : '📄';
  }
}