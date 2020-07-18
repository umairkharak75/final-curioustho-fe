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
  notifications
  notificationslength
  constructor(public route: Router,public PostService:PostService) {
    this.notifications=[]
  }

  ngOnInit(): void {

   

    this.PostService.getAddedPost().subscribe(notifications=>{
      notifications=notifications
      notifications.forEach(notification=>{
        if(notification.userNotification===this.loggedUser.id){
          this.notifications.push(notification)
        }
      })
      this.notificationslength=this.notifications.length
    })
  }
  logout() {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/');
  }

  
}
