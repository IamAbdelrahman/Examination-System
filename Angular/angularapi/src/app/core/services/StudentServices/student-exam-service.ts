import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface StudentExamListDto {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:44301/api/StudentExam';

  getAvailableExams(page: number = 1, pageSize: number = 10, searchTerm: string = ''): Observable<StudentExamListDto[]> {
    const token = localStorage.getItem('exam-token') || localStorage.getItem('token');
    
    if (!token) {
      return throwError(() => new Error('No authentication token found. Please login.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Only add search parameter if there's actually a search term
    if (searchTerm && searchTerm.trim()) {
      params = params.set('title', searchTerm.trim());
    }

    const endpoint = (searchTerm && searchTerm.trim()) ? `${this.apiUrl}/search` : `${this.apiUrl}`;

    return this.http.get<StudentExamListDto[]>(endpoint, { 
      params, 
      headers 
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      // Token expired or invalid - remove both possible token keys
      localStorage.removeItem('token');
      localStorage.removeItem('exam-token');
      return throwError(() => new Error('Authentication failed. Please login again.'));
    }
    
    if (error.status === 400 && error.error?.errors) {
      // Validation errors
      const validationErrors = Object.values(error.error.errors).flat();
      return throwError(() => new Error(`Validation error: ${validationErrors.join(', ')}`));
    }
    
    return throwError(() => new Error(
      error.error?.message || 
      error.message || 
      'An unknown error occurred while loading exams'
    ));
  }
}