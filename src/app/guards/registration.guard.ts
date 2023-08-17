import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registrationGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.canEnterKey === true) {
    router.navigate(['/register']);
    return true;
  }
  return false;
};

// @Injectable()
// class canEnterRegistrationKey {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.canEnterKey === true) {
//       return true;
//     }
//     this.router.navigate(['/register']);
//     return false;
//   }
// }

// export const registrationGuard: CanActivateFn = (route, state) => {
//   return inject(canEnterRegistrationKey).canActivate();
// };
