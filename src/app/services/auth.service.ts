import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subpage = 'Auth';

  constructor(private http: HttpClient) {}

  public Register(user: User): Observable<User[]> {
    return this.http.post<User[]>(
      `${environment.apiURL}/${this.subpage}/${this.Register.name}`,
      user
    );
  }
}
