import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { NewPassword } from '../models/NewPassword';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subpage = 'auth';

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {}

  public Register(user: User): Observable<User[]> {
    return this.http.post<User[]>(
      `${environment.apiURL}/${
        this.subpage
      }/${this.Register.name.toLowerCase()}`,
      user
    );
  }

  public RegisterConfirmation(key: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${environment.apiURL}/${this.subpage}/register/confirmation?key=${key}`,
      { headers }
    );
  }

  public Login(login: Login): Observable<any> {
    return this.http.post<Login>(
      `${environment.apiURL}/${this.subpage}/${this.Login.name.toLowerCase()}`,
      login
    );
  }

  public ChangePassword(newPassword: NewPassword): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(
      `${environment.apiURL}/${
        this.subpage
      }/${this.ChangePassword.name.toLowerCase()}`,
      newPassword, {headers}
    );
  }

  public NewPassword(newPassword: NewPassword): Observable<any> {
    return this.http.post<any>(
      `${environment.apiURL}/${
        this.subpage
      }/${this.NewPassword.name.toLowerCase()}`,
      newPassword
    );
  }

  public NewPasswordConfirmation(key: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${environment.apiURL}/${this.subpage}/newpassword/confirmation?key=${key}`,
      { headers }
    );
  }

  public startKeyGuard(
    nextPath: string,
    currentPath: string,
    minutes: number = 15
  ): void {
    setTimeout(() => {
      if (localStorage.getItem('key')) {
        localStorage.removeItem('key');
      }
      if (this.location.path() == nextPath) {
        this.router.navigate([currentPath]);
      }
    }, 1000 * 60 * minutes);
  }
}
