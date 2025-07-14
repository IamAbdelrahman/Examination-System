import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface StudentResultDetailsDto {
  resultId: number;
  examTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  dateTaken: Date;
}


@Injectable({
  providedIn: 'root'
})
export class ResultDetailsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:44301/api/StudentExam';

  getResultDetails(resultId: number): Observable<StudentResultDetailsDto> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication required'));

    return this.http.get<StudentResultDetailsDto>(`${this.apiUrl}/results/${resultId}`, {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Result Details Error:', error);
    
    if (error.status === 401) {
      this.clearTokens();
      return throwError(() => new Error('Session expired. Please log in again.'));
    }

    if (error.status === 403) {
      return throwError(() => new Error('You can only view your own results.'));
    }

    if (error.status === 404) {
      return throwError(() => new Error('Result not found.'));
    }

    const errorMessage = error.error?.message || 
                       'An error occurred while loading result details';
    
    return throwError(() => new Error(errorMessage));
  }

  private clearTokens(): void {
    ['token', 'exam-token'].forEach(key => localStorage.removeItem(key));
  }
}