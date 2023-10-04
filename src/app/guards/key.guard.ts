import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

export const keyGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const location: Location = inject(Location);

  if (localStorage.getItem('key')) {
    return true;
  } else {
    location.back();
    return false;
  }
};
