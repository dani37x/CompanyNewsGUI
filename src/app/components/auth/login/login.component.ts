import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Subscription, catchError, takeUntil, tap } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User();
  loginForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  login: Login = new Login();
  private subscription$ = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formValidators();
    this.subscribeFormChanges();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription$.unsubscribe();
  }

  private formValidators(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private subscribeFormChanges(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.login.email = formValues.email;
        this.login.password = formValues.password;
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.subscription$ = this.authService
        .Login(this.login)
        .pipe(
          tap((response) => {
            let token = JSON.stringify(response);
            token = token
              .replace('{"token":"', '')
              .replace('"', '')
              .replace('}', '');
            localStorage.setItem('token', token);
            console.log('Logged in ', response);
            const jwtHelper = new JwtHelperService();
            console.log(jwtHelper.decodeToken(token));

            this.router.navigate(['/']);
          }),
          catchError((error) => {
            console.error('Login Error ', error);
            throw this.router.navigate(['/login']);
          })
        )
        .subscribe();
    }
  }
}
