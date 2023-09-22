import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  user: User = new User();
  private destroy$: Subject<void> = new Subject<void>();
  private serviceSubscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.formValidators();
    this.subscribeFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.serviceSubscription$.unsubscribe();
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
          Validators.minLength(9),
          // Validators.pattern(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          // ),
        ],
      ],
      updateOn: 'change',
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
      this.serviceSubscription$ = this.authService
        .Register(this.user)
        .pipe(
          tap((response) => {
            if (response === true) {
              localStorage.setItem('key', 'key');
              this.authService.startKeyGuard(
                '/register/confirmation',
                '/register'
              );
              this.router.navigate(['/register/confirmation']);
            } else {
              this.router.navigate(['/register/confirmation']);
            }

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
