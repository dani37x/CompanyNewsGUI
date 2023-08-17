import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterConfirmationComponent } from './components/auth/register/register-confirmation/register-confirmation.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { registrationGuard } from './guards/registration.guard';
import { tokenGuard } from './guards/token.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'register/confirmation',
    component: RegisterConfirmationComponent,
    canActivate: [registrationGuard],
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
