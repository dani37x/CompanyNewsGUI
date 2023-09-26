import { Component } from '@angular/core';
import { NotificationMessage } from 'src/app/models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  showNotification: boolean = true;
  backgroundColor!: string;
  mainNotification!: NotificationMessage;
  notifications: Array<NotificationMessage> = [];
  counter: number = 1;

  constructor() {
    let message =
      'when an unknown printer took a galley of type and scrambled it to make a type specimen book';
    let color = 'red';
    let x = new NotificationMessage(message, '#b34045');
    let y = new NotificationMessage(message, '#99e9eb');
    let z = new NotificationMessage(message, '#fecf6d');
    this.notifications.push(x, y, z);
    this.mainNotification = this.notifications[0];
  }

  changeNotification(value: number): void {
    let index = this.notifications.indexOf(this.mainNotification);
    if (value > 0 && index + value < this.notifications.length) {
      this.mainNotification = this.notifications[index + 1];
      this.counter += 1;
    } else if (value < 0 && index - value > 0) {
      this.mainNotification = this.notifications[index - 1];
      this.counter -= 1;
    }
  }

  deleteNotifications(): void {
    this.notifications.length = 0;
  }
}
