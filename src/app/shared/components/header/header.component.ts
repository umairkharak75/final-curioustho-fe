import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { ApiService } from './../../../core/services/api.service';
import { PostService } from './../../../main-dashboard/services/post.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  questionLength;
  @Output() profileClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    public route: Router,
    public PostService: PostService,
    public api: ApiService,
    public sharedDataService: SharedDataService
  ) {
    this.notifications = [];
  }
  ngOnInit(): void {
    this.getAllNotifications();
    this.getUnAnswerdQuestionLength();
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
    this.route.navigateByUrl('home');
  }
  getAllNotifications() {
    this.notificationslength = 0;
    const url = `http://localhost:5000/api/posts/notification/${this.loggedUser.id}`;
    this.api.getData(url).subscribe((notification) => {
      this.notifications = notification;
      this.notifications.forEach((notification) => {
        if (notification.status === 'unSeen') {
          this.notificationslength = this.notificationslength + 1;
        }
      });
    });
  }
  routeToInBox() {
    this.route.navigateByUrl('profile/inbox/user');
  }
  routeToProfle() {
    this.route.navigateByUrl(`profile/${this.loggedUser.id}`);
    this.profileClicked.emit();
  }
  routeToNotifications() {
    this.route.navigateByUrl('profile/notification/user');
  }

  getUnAnswerdQuestionLength() {
    const url = `http://localhost:5000/api/question/length/${this.loggedUser.id}`;
    this.api.getData(url).subscribe((response) => {
      this.questionLength = response;
    });
  }
  navigateToSettings() {
    this.route.navigateByUrl('profile/user/settings');
  }
}
