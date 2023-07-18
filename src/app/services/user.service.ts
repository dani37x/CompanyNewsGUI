import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'User';
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/${this.url}`);
  }
  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiURL}/${this.url}/`, user);
  }
  public updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiURL}/${this.url}`, user);
  }
  public deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>(`${environment.apiURL}/${this.url}/${user.id}`);
  }
}
