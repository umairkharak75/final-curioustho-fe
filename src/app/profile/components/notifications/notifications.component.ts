import { ApiService } from './../../../core/services/api.service';
import { SharedDataService } from './../../../shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  user;
  notification;
  constructor(
    public sharedData: SharedDataService,
    public api: ApiService,
    public _snackBar: MatSnackBar
  ) {}

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

  deleteNotification(params) {
    console.log(params);
    const url = `http://localhost:5000/api/posts/notification/${params._id}`;
    this.api.deleteData(url).subscribe((response) => {
      if (response.msg === 'Notification removed') {
        this.notification = this.notification.filter((notification) => {
          notification._id !== params._id;
        });
        this.openSnackBar('Successfully notification deleted', 'Deleted');
      }
    });
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
