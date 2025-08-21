import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface OptionResponseDto {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuestionResponseDto {
  id: number;
  text: string;
  options: OptionResponseDto[];
}

export interface ExamResponseDto {
  id: number;
  title: string;
  description: string;
  questions: QuestionResponseDto[];
}

@Injectable({
  providedIn: 'root'
})
export class ExamDetailsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://examination-system.runasp.net/api/exam';

  getExamDetails(id: number): Observable<ExamResponseDto> {
    return this.http.get<ExamResponseDto>(`${this.apiUrl}/details/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error(
      error.error?.message || 
      error.message || 
      'An unknown error occurred'
    ));
  }
}