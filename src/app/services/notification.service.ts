import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationMessage } from '../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications$: BehaviorSubject<NotificationMessage[]> = new BehaviorSubject<
    NotificationMessage[]
  >([]);
  constructor() {}

  addNotification(notification: NotificationMessage): void {
    const currentNotifications = this.notifications$.value;
    currentNotifications.push(notification);
    this.notifications$.next(currentNotifications);
  }

  getNotifications() {
    return this.notifications$.asObservable();
  }
}
