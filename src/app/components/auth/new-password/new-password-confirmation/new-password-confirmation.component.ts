import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password-confirmation',
  templateUrl: './new-password-confirmation.component.html',
  styleUrls: ['./new-password-confirmation.component.css'],
})
export class NewPasswordConfirmationComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(key: string) {
    this.authService
      .NewPasswordConfirmation(key)
      .pipe(
        tap((response) => {
          if (response === true) {
            if (localStorage.getItem('key')) {
              localStorage.removeItem('key');
            }
            this.router.navigate(['/login']);
            console.log(response);
          } else {
            console.log(response, 'wrong code');
          }
        }),
        catchError((error) => {
          console.log('errrrrrrrrror ', error);
          throw error;
        })
      )
      .subscribe();
  }
}
