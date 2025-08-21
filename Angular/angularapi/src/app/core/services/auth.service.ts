import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://examination-system.runasp.net';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) this.setCurrentUser(token);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, model);
  }

  register(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, model);
  }

  setCurrentUser(token: string): void {
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    this.currentUserSubject.next(decoded);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decoded: any = jwtDecode(token);
    return decoded?.roles?.includes(role);
  }
}