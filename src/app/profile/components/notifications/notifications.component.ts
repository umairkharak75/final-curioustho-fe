import { ApiService } from './../../../core/services/api.service';
import { SharedDataService } from './../../../shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  user;
  notification;
  constructor(public sharedData: SharedDataService, public api: ApiService) {}

  ngOnInit(): void {
    this.user = this.sharedData.getUserFromLs();
    this.getAllNotifications();
  }
  getAllNotifications() {
    const url = `http://localhost:5000/api/posts/notification/${this.user.id}`;
    this.api.getData(url).subscribe((notification) => {
      console.log(notification);
      this.notification = notification;
      this.changeNotificationStatus();
    });
  }
  changeNotificationStatus() {
    const url = `http://localhost:5000/api/posts/notification/${this.user.id}`;

    this.api.patchData(url).subscribe((response) => {
      console.log(response);
    });
  }
}
