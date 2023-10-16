import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  const role = authService.extractDataFromJWTToken(
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  );
  if (role == route.data.role) {
    return true;
  }
  return false;
};
