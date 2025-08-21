import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface CreateOptionDto {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionDto {
  text: string;
  options: CreateOptionDto[];
}

export interface CreateExamDto {
  title: string;
  description: string;
  questions: CreateQuestionDto[];
}

export interface ExamResponseDto {
  id: number;
  title: string;
  description: string;
  questions: QuestionResponseDto[];
}

interface QuestionResponseDto {
  id: number;
  text: string;
  options: OptionResponseDto[];
}

interface OptionResponseDto {
  id: number;
  text: string;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CreateExamService {
  private http = inject(HttpClient);
  private apiUrl = 'http://examination-system.runasp.net/api/exam';

  createExam(examData: CreateExamDto): Observable<ExamResponseDto> {
    return this.http.post<ExamResponseDto>(this.apiUrl, examData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.status === 400) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error?.title) {
        errorMessage = error.error.title;
      } else if (error.error?.errors) {
        errorMessage = Object.values(error.error.errors).join(', ');
      }
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect to the server. Please check your network connection.';
    }

    return throwError(() => new Error(errorMessage));
  }
}