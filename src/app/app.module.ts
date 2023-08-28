import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserFormComponent } from './components/edit-user/edit-user-form/edit-user-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor, AuthInterceptorProvider } from './components/auth/auth.interceptor';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterConfirmationComponent } from './components/auth/register/register-confirmation/register-confirmation.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/layout/footer/footer/footer.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';
import { KeyInputComponent } from './components/layout/key-input/key-input.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserFormComponent,
    RegisterComponent,
    EditUserComponent,
    LoginComponent,
    HomeComponent,
    RegisterConfirmationComponent,
    NavbarComponent,
    FooterComponent,
    NewPasswordComponent,
    KeyInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
