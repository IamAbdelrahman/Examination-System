import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
  const expectedRole = route.data['role'];
  const token = localStorage.getItem('exam-token');
  console.log(token);
  if (!token) return false;
  const decoded: any = jwtDecode(token);
  console.log(decoded);
  const roles: string[] = JSON.parse(decoded.roles);
  console.log(roles);

  return roles.includes(expectedRole);
}
}


