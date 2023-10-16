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
import { NewPasswordConfirmationComponent } from './components/auth/new-password/new-password-confirmation/new-password-confirmation.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
    path: 'new-password/confirmation',
    component: NewPasswordConfirmationComponent,
    canActivate: [keyGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [tokenGuard],
  },
  {
    path: 'test',
    component: PasswordInputComponent,
    canActivate: [roleGuard],
    data: {
      role: 'user'
    }
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    // canActivate: [tokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
