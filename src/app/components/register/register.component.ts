import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: User = new User();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidators();
    this.subscribeFormChanges();
  }

  formValidators(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          // Validators.minLength(3)
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          // Validators.minLength(2)
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          // Validators.minLength(3),
          // Validators.email
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(9),
          // Validators.pattern(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          // ),
        ],
      ],
    });
  }

  subscribeFormChanges(): void {
    this.registerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.user.firstName = formValues.firstName;
        this.user.lastName = formValues.lastName;
        this.user.email = formValues.email;
        this.user.password = formValues.password;
      });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .Register(this.user)
        .pipe(
          tap((response) => {
            this.router.navigate(['/register/confirmation']);
            console.log(response);
          }),
          catchError((error) => {
            console.error('Registration Error ', error);
            throw this.router.navigate(['/register']);
          })
        )
        .subscribe();
    }
  }
}
