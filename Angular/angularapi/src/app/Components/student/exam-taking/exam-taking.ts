import { Component, inject, OnInit, signal } from '@angular/core';
import { ExamTakingService, StudentExamDetailDto, ExamSubmissionDto, ExamResultDto } from '../../../core/services/StudentServices/exam-taking-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-taking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-taking.html',
  styleUrl: './exam-taking.css'
})
export class ExamTaking implements OnInit {
  private examService = inject(ExamTakingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  exam = signal<StudentExamDetailDto | null>(null);
  result = signal<ExamResultDto | null>(null);
  answers = signal<Record<number, number>>({});
  loading = signal(true);
  submitting = signal(false);
  error = signal('');
  alreadyTaken = signal(false);

  ngOnInit() {
    const examId = this.route.snapshot.params['id'];
    if (examId) {
      this.checkExamStatus(+examId);
    } else {
      this.error.set('Invalid exam ID');
      this.loading.set(false);
    }
  }

  checkExamStatus(examId: number) {
    this.loading.set(true);
    this.error.set('');
    this.alreadyTaken.set(false);

    this.examService.checkExamTaken(examId).subscribe({
      next: (status) => {
        if (status.HasTaken) {
          this.alreadyTaken.set(true);
          this.loading.set(false);
        } else {
          this.loadExam(examId);
        }
      },
      error: (err) => {
        this.error.set('Error checking exam status: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  loadExam(id: number) {
    this.loading.set(true);
    this.error.set('');

    this.examService.getExamForTaking(id).subscribe({
      next: (exam) => {
        this.exam.set(exam);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error loading exam: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  submitExam() {
    if (!this.exam()) return;

    this.submitting.set(true);
    this.error.set('');

    const submission: ExamSubmissionDto = {
      examId: this.exam()!.id,
      answers: Object.entries(this.answers()).map(([questionId, optionId]) => ({
        questionId: Number(questionId),
        selectedOptionId: optionId
      }))
    };

    this.examService.submitExam(submission).subscribe({
      next: (result) => {
        this.result.set(result);
        this.submitting.set(false);
      },
      error: (err) => {
        if (err.message.includes('already taken')) {
          this.alreadyTaken.set(true);
          this.error.set('');
        } else {
          this.error.set('Error submitting exam: ' + err.message);
        }
        this.submitting.set(false);
      }
    });
  }

  returnToExams() {
    this.router.navigate(['/student/exams']);
  }

  /**
   * Convert index to letter (A, B, C, D, etc.)
   */
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
  }
}