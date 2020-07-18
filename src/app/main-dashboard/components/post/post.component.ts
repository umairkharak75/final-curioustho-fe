import { Router } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SharedDataService } from './../../../shared/service/shared-data.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post;
  @Input() user;
  @Output() deletedPost = new EventEmitter();
  postProfilePic
  postUserName

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  hasSubmit: boolean;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  constructor(
    public router:Router,
    public dialog: MatDialog,
    public postService: PostService,
    public sharedDataService: SharedDataService
  ) {
    this.hasSubmit = false;
  }

  ngOnInit(): void {
    if(this.post.user){
      if(this.post.user.profilePic){
        this.postProfilePic=this.post.user.profilePic
        this.postUserName=this.post.user.name
      }
    }
    this.setPostReviewsValue();
    this.formatDate()
  }

  reviewValue(params) {
    this.value = params.value;
  }
  onDropReview(value: number) {
    if (!this.hasSubmit) {
      this.value = value;
      const url = `http://localhost:5000/api/posts/review/${this.post._id}`;
      const data = { review: this.value };
      this.postService.postReview(url, data).subscribe((data) => {
        this.hasSubmit = true;
      
        this.postService.addPost(this.user._id)
        this.postService.getAddedPost().subscribe(data=>{console.log(data)})
      });
    }
  }

  setPostReviewsValue() {
    const user = JSON.parse(this.sharedDataService.getUser());
    if (this.post.comments) {
      this.post.comments.forEach((element) => {
        if (element.user === user.id) {
          this.value = element.review;
          this.hasSubmit = true;
        }
      });
    }
  }

  routeToProfile(){
    this.router.navigateByUrl(`profile/${this.post.user.id}`)
  }


  deletePost() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'delete') {
        const url = `http://localhost:5000/api/posts/${this.post._id}`;
        this.postService.deletePost(url).subscribe((response) => {
          if (response.msg === 'Post removed') {
            this.deletedPost.emit(this.post);
          }
        });
      }
    });
  }
  formatDate(){
    this.post.date
    
    const date=moment(this.post.date, "MM-DD-YYYY");
    console.log(date)

  }
}
