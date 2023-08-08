import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  loginForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  login: Login = new Login();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidators();
    this.subscribeFormChanges();
  }

  formValidators(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  subscribeFormChanges(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.login.email = formValues.email;
        this.login.password = formValues.password;
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .Login(this.login)
        .pipe(
          tap((response) => {
            if (response === true) {
              console.log('Logged in ', response);
              this.router.navigate(['/']);
            } else {
              console.log('Incorrect data ', response);
              this.router.navigate(['/login']);
            }
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
