import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface StudentResultSummaryDto {
  resultId: number;
  examTitle: string;
  percentage: number;
  dateTaken: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StudentResultService {
  private http = inject(HttpClient);
  private apiUrl = 'http://examination-system.runasp.net/api/StudentExam';

  getMyResults(page: number = 1, pageSize: number = 10): Observable<StudentResultSummaryDto[]> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Authentication required'));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<StudentResultSummaryDto[]>(`${this.apiUrl}/results`, { 
      headers, 
      params 
    }).pipe(
      catchError(this.handleError)
    );
  }

  private getToken(): string | null {
    return localStorage.getItem('exam-token') || localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Results Error:', error);
    
    if (error.status === 401) {
      this.clearTokens();
      return throwError(() => new Error('Session expired. Please log in again.'));
    }

    const errorMessage = error.error?.message || 
                       error.error?.title || 
                       'An error occurred while loading your results';
    
    return throwError(() => new Error(errorMessage));
  }

  private clearTokens(): void {
    ['token', 'exam-token'].forEach(key => localStorage.removeItem(key));
  }
}