import { Component, inject, signal, OnInit } from '@angular/core';
import { ExamDetailsService, ExamResponseDto } from '../../../../core/services/exam-details';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exam-details.html',
  styleUrl: './exam-details.css'
})
export class ExamDetails implements OnInit {
  private examDetailsService = inject(ExamDetailsService);
  private route = inject(ActivatedRoute);

  exam = signal<ExamResponseDto | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('No exam ID provided');
      this.loading.set(false);
      return;
    }

    this.loadExamDetails(+id);
  }

  loadExamDetails(id: number) {
    this.loading.set(true);
    this.error.set('');

    this.examDetailsService.getExamDetails(id).subscribe({
      next: (exam) => {
        this.exam.set(exam);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load exam details');
        this.loading.set(false);
      }
    });
  }

  /**
   * Convert index to letter (A, B, C, D, etc.)
   */
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
  }
}