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

// @Injectable()
// class canEnterRegistrationKey {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     if (this.authService.canEnterKey === true) {
//       return true;
//     }
//     this.router.navigate(['/register']);
//     return false;
//   }
// }

// export const registrationGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   return inject(canEnterRegistrationKey).canActivate(route, state);
// };
