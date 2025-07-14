import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'exam-token';
  private ROLE_KEY = 'exam-role';

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveRole(role: string): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  public getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  public clear(): void {
    localStorage.clear();
  }
}
