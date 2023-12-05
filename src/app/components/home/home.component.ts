import { Component, OnInit } from '@angular/core';
import { NotificationMessage } from 'src/app/models/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  footerBackgroundColorInput: string = '#333'

  constructor(private notificationService: NotificationService) {

    let message = new NotificationMessage('sieeema', 'red');
    notificationService.addNotification(message);
  }
}
