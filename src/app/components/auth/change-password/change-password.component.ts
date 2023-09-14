import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { NewPassword } from 'src/app/models/NewPassword';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(newPassword: NewPassword) {
    this.authService
      .ChangePassword(newPassword)
      .pipe(
        tap((response) => {
          if (response === true) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/change-password']);
          }
          console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          throw this.router.navigate(['/change-password']);
        })
      )
      .subscribe();
  }
}
