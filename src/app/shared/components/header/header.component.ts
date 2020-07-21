import { ApiService } from './../../../core/services/api.service';
import { PostService } from './../../../main-dashboard/services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() loggedUser;
  notifications;
  notificationslength;
  constructor(
    public route: Router,
    public PostService: PostService,
    public api: ApiService
  ) {
    this.notifications = [];
  }

  ngOnInit(): void {
    this.getAllNotifications();

    this.PostService.getAddedPost().subscribe((notifications) => {
      notifications = notifications;
      notifications.forEach((notification) => {
        if (
          notification.userNotification === this.loggedUser.id &&
          notification.status === 'unSeen'
        ) {
          this.notifications.push(notification);
        }
      });
      this.notificationslength = this.notifications.length;
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/');
  }
  routeToHome() {
    this.route.navigateByUrl('/');
  }
  getAllNotifications() {
    const url = `http://localhost:5000/api/posts/notification/${this.loggedUser.id}`;
    this.api.getData(url).subscribe((notification) => {
      console.log(notification);
      this.notificationslength = notification.length;
    });
  }
}
