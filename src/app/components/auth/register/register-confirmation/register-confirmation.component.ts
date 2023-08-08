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
  key!: string;
  keyForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidator();
    this.subscribeFormChanges();
  }

  formValidator(): void {
    this.keyForm = this.formBuilder.group({ key: ['', Validators.required] });
  }

  subscribeFormChanges(): void {
    this.keyForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.key = formValues.key;
      });
  }

  onSubmit() {
    if (this.keyForm.valid) {
      this.authService
        .RegisterConfirmation(this.key)
        .pipe(
          tap((response) => {
            if (response === true) {
              this.router.navigate(['/login'])
              this.authService.canEnterKey = false;
              console.log(response);
            } else {
              this.router.navigate(['/register/confirmation']);
              console.log(response);
            }
          }),
          catchError((error) => {
            console.log('looooooooooooooo ', error);
            throw this.router.navigate(['/register/confirmation']);
          })
        )
        .subscribe();
    }
  }
}
