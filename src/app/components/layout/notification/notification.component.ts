import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'src/app/models/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnDestroy {
  showNotification: boolean = true;
  backgroundColor!: string;
  mainNotification!: NotificationMessage;
  counter: number = 1;
  currentNotifications!: NotificationMessage[];
  private serviceSubscription$ = new Subscription();

  constructor(private notificationService: NotificationService) {
    setTimeout(() => {
      this.serviceSubscription$ = this.notificationService
        .getNotifications()
        .subscribe((data) => {
          this.currentNotifications = data;
          // this.currentNotifications.push(
          //   new NotificationMessage('olod', 'blue')
          // );
          this.mainNotification = this.currentNotifications[0];
          this.counter = 1;
        });
    }, 5000);
  }

  ngOnDestroy(): void {
    this.serviceSubscription$.unsubscribe();
  }

  changeNotification(value: number): void {
    let index = this.currentNotifications.indexOf(this.mainNotification);
    if (value > 0 && index + value < this.currentNotifications.length) {
      this.mainNotification = this.currentNotifications[index + 1];
      this.counter += 1;
    } else if (value < 0 && index - 1 >= 0) {
      this.mainNotification = this.currentNotifications[index - 1];
      this.counter -= 1;
    }
  }

  deleteCurrentNotification(): void {
    if (this.currentNotifications.length > 1) {
      const elements = this.currentNotifications.filter((n) => {
        return n.message != this.mainNotification.message;
      });
      this.currentNotifications = elements;
      this.mainNotification = this.currentNotifications[0];
      this.counter = 1;
    } else {
      this.deleteNotifications();
    }
  }

  deleteNotifications(): void {
    this.currentNotifications = [];
  }
}
