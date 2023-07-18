import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent {
  @Input() user?: User;
  @Output() updatedUser = new EventEmitter<User[]>();

  constructor(private userService : UserService){}

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
