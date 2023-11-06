import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnDestroy {
  users: User[] = [];
  userToEdit?: User;
  private subscription$ = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription$ = this.userService
      .getUsers()
      .subscribe((result: User[]) => (this.users = result));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  updatedUsersList(): void {
    this.userService.getUsers().subscribe((updatedUsers: User[]) => {
      this.users = updatedUsers;
    });
  }

  addNewUser(): void {
    this.userToEdit = new User();
  }
  editUser(user: User): void {
    this.userToEdit = user;
  }
}
