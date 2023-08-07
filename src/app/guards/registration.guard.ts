import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registrationGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  // const router: Router = inject(Router);

  if (authService.canEnterKey === true) {
    return true;
  }
  return false;
};
