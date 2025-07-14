import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const RoleGuard = (role: string): CanActivateFn => () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasRole(role)) return true;
  router.navigate(['/unauthorized']);
  return false;
};
