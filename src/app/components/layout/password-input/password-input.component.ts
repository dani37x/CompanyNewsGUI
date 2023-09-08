import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, takeUntil } from 'rxjs';
import { NewPassword } from 'src/app/models/NewPassword';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
})
export class PasswordInputComponent {
  @Output() newPasswordInput = new EventEmitter<NewPassword>();
  @Input() purposeName!: string;
  newPasswordModel!: NewPassword;
  newPasswordForm!: FormGroup;
  token = localStorage.getItem('token');
  emailValue!: string;
  isEmailInToken: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.emailValue = this.extractEmailFromJWTToken() || '';
    this.formValidator();
    this.subscribeFormChanges();
    this.checkUserEmailAndSetEmailField();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formValidator(): void {
    this.newPasswordForm = this.formBuilder.group({
      email: [this.emailValue, [Validators.required, Validators.email]],
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

  subscribeFormChanges(): any {
    this.newPasswordForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        this.newPasswordModel.email = formValues.email;
        this.newPasswordModel.password = formValues.password;
      });
  }

  extractEmailFromJWTToken(): any {
    if (this.token != null) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(this.token);
      // console.log(decodedToken[parameter]);
      return decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    }
  }

  checkUserEmailAndSetEmailField(): void {
    if (this.emailValue == this.extractEmailFromJWTToken()) {
      this.newPasswordForm.get('email')?.disable();
      this.isEmailInToken = true;
    }
  }

  sendModel() {
    if (this.newPasswordForm.valid) {
      this.newPasswordInput.emit(this.newPasswordModel);
    }
  }
}
