import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css'],
})
export class EditUserFormComponent {
  @Input() user?: User;
  @Output() updatedUser = new EventEmitter<User[]>();

  constructor(private userService: UserService) {}

  updateUser(user: User) {
    this.userService
      .updateUser(user)
      .subscribe((users: User[]) => this.updatedUser.emit(users));
  }
  deleteUser(user: User) {
    this.userService
      .deleteUser(user)
      .subscribe((users: User[]) => this.updatedUser.emit(users));
  }
  createUser(user: User) {
    this.userService
      .createUser(user)
      .subscribe((users: User[]) => this.updatedUser.emit(users));
  }
}
