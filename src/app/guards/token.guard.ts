import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const tokenGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token');

  if (token != null && !jwtHelper.isTokenExpired(token)) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
