import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface StudentExamDetailDto {
  id: number;
  title: string;
  description: string;
  questions: StudentQuestionDto[];
}

export interface StudentQuestionDto {
  id: number;
  text: string;
  options: StudentOptionDto[];
}

export interface StudentOptionDto {
  id: number;
  text: string;
}

export interface ExamSubmissionDto {
  examId: number;
  answers: AnswerSubmissionDto[];
}

export interface AnswerSubmissionDto {
  questionId: number;
  selectedOptionId: number;
}

export interface ExamResultDto {
  id: number;
  examId: number;
  examTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  dateTaken: Date;
  questionResults: QuestionResultDto[];
}

export interface QuestionResultDto {
  questionId: number;
  questionText: string;
  selectedOptionId: number;
  selectedOptionText: string;
  correctOptionId: number;
  correctOptionText: string;
  isCorrect: boolean;
}

// Fixed interface to match API response exactly
export interface ExamStatusDto {
  HasTaken: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExamTakingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://examination-system.runasp.net/api/StudentExam';

  // Check if exam has been taken
  checkExamTaken(examId: number): Observable<ExamStatusDto> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication required'));

    return this.http.get<ExamStatusDto>(`${this.apiUrl}/${examId}/check-taken`, {
      headers: this.getAuthHeaders(token)
    }).pipe(
      catchError(this.handleError)
    );
  }

  getExamForTaking(id: number): Observable<StudentExamDetailDto> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication required'));

    return this.http.get<StudentExamDetailDto>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(token)
    }).pipe(
      catchError(this.handleError)
    );
  }

  submitExam(submission: ExamSubmissionDto): Observable<ExamResultDto> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication required'));

    return this.http.post<ExamResultDto>(`${this.apiUrl}/submit`, submission, {
      headers: this.getAuthHeaders(token)
    }).pipe(
      catchError(this.handleError)
    );
  }

  private getToken(): string | null {
    return localStorage.getItem('exam-token') || localStorage.getItem('token');
  }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    console.error('Exam Taking Error:', error);
    
    if (error.status === 401) {
      this.clearTokens();
      return throwError(() => new Error('Session expired. Please log in again.'));
    }

    // Handle specific error for already taken exam
    if (error.status === 400 && error.error && 
        typeof error.error === 'string' && 
        error.error.includes('already taken')) {
      return throwError(() => new Error('You have already taken this exam.'));
    }

    const errorMessage = error.error?.message ||
                        error.error?.title ||
                        error.error ||
                        this.parseValidationErrors(error) ||
                        'An error occurred during exam operation';
    
    return throwError(() => new Error(errorMessage));
  }

  private parseValidationErrors(error: HttpErrorResponse): string {
    if (!error.error?.errors) return '';
    return Object.values(error.error.errors).flat().join(', ');
  }

  private clearTokens(): void {
    ['token', 'exam-token'].forEach(key => localStorage.removeItem(key));
  }
}