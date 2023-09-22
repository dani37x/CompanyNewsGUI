import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password-confirmation',
  templateUrl: './new-password-confirmation.component.html',
  styleUrls: ['./new-password-confirmation.component.css'],
})
export class NewPasswordConfirmationComponent implements OnDestroy {
  private subscription$ = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit(key: string) {
    this.subscription$ = this.authService
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
