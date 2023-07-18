import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'CompanyNewsUI';
  users: User[] = [];
  userToEdit? : User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((result: User[]) => (this.users = result));
  }

  updatedUsersList(users: User[]){
    this.users = users;
  }

  addNewUser(){
    this.userToEdit = new User();
  }
  editUser(user : User){
    this.userToEdit = user;
  }
}
