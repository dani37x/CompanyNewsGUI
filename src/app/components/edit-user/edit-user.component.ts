import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  users: User[] = [];
  userToEdit?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((result: User[]) => (this.users = result));
  }

  updatedUsersList(users: User[]) {
    this.users = users;
  }

  addNewUser() {
    this.userToEdit = new User();
  }
  editUser(user: User) {
    this.userToEdit = user;
  }
}
