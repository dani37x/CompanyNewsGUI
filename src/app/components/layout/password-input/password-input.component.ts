import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, takeUntil } from 'rxjs';
import { NewPassword } from 'src/app/models/NewPassword';
import { equalToValidator } from '../../form-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
})
export class PasswordInputComponent implements OnInit, OnDestroy {
  @Output() newPasswordData = new EventEmitter<NewPassword>();
  @Input() purposeName!: string;
  newPasswordModel: NewPassword = {
    email: '',
    password: '',
  };
  newPasswordForm!: FormGroup;
  isEmailInToken: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formValidator();
    this.checkUserEmailAndSetEmailField();
    this.subscribeFormChanges();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.newPasswordData.unsubscribe();
  }

  formValidator(): void {
    this.newPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
      repeatPassword: ['', [Validators.required]],
    });
  }

  subscribeFormChanges(): void {
    this.newPasswordForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        if (this.isEmailInToken === false) {
          this.newPasswordModel.email = formValues.email;
        } else {
          this.newPasswordModel.email =
            this.authService.extractDataFromJWTToken(
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            );
        }
        this.newPasswordModel.password = formValues.password;
      });
  }

  checkUserEmailAndSetEmailField(): void {
    if (
      this.authService.extractDataFromJWTToken(
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      )
    ) {
      this.newPasswordForm.get('email')?.disable();
      this.isEmailInToken = true;
    }
  }

  sendModel(): void {
    if (this.newPasswordForm.valid) {
      console.log('model:', this.newPasswordModel);
      this.newPasswordData.emit(this.newPasswordModel);
    }
  }
}
