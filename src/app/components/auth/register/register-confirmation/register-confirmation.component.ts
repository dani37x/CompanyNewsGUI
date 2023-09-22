import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css'],
})
export class RegisterConfirmationComponent {
  keyForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(key: string) {
    this.authService
      .RegisterConfirmation(key)
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
