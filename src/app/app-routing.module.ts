import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterConfirmationComponent } from './components/auth/register/register-confirmation/register-confirmation.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { keyGuard } from './guards/key.guard';
import { tokenGuard } from './guards/token.guard';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';
import { PasswordInputComponent } from './components/layout/password-input/password-input.component';

const routes: Routes = [
  { path: '', component: NewPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'register/confirmation',
    component: RegisterConfirmationComponent,
    canActivate: [keyGuard],
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
  },
  {
    path: 'test',
    component: PasswordInputComponent,
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [tokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
