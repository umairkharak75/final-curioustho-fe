import { environment } from './../../../../environments/environment';
import { OnInit, EventEmitter, Input, Output, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/main-dashboard/services/post.service';
import { SharedDataService } from '../../service/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post;
  @Input() user;
  postUserId;
  @Output() deletedPost = new EventEmitter();
  postProfilePic;
  postUserName;
  totalReviews;

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
  backendUrl = environment.backEndUrl;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public postService: PostService,
    public sharedDataService: SharedDataService
  ) {
    this.hasSubmit = false;
  }

  ngOnInit(): void {
    if (typeof this.post.user === 'string') {
      {
        this.postUserId = this.post.user;
      }
    } else {
      this.postUserId = this.post.user._id;
    }

    if (this.post.comments) {
      this.totalReviews = this.post.comments.length;
    }

    if (this.post.user) {
      if (this.post.user.profilePic) {
        this.postProfilePic = this.post.user.profilePic;
        this.postUserName = this.post.user.name;
      }
    }
    this.setPostReviewsValue();
    this.formatDate();
  }

  reviewValue(params) {
    this.value = params.value;
  }
  onDropReview(value: number) {
    if (!this.hasSubmit) {
      this.value = value;
      const url = `api/posts/review/${this.post._id}`;
      const data = { review: this.value };
      this.postService.postReview(url, data).subscribe((data) => {
        this.hasSubmit = true;
        const newReviewObject = {
          date: new Date(),
          name: this.user.name,
          review: this.value,
          user: this.user.id,
          profilePic: this.user.profielPic,
        };
        this.post.comments.push(newReviewObject);

        this.postService.addPost(this.user._id);
        this.postService.getAddedPost().subscribe((data) => {});
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

  routeToProfile() {
    console.log(this.post);
    this.router.navigateByUrl(`profile/${this.post.user._id}`);
  }
  routeToProfileByComment(userId) {
    this.router.navigateByUrl(`profile/${userId}`);
  }

  deletePost() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'delete') {
        const url = `api/posts/${this.post._id}`;
        this.postService.deletePost(url).subscribe((response) => {
          if (response.msg === 'Post removed') {
            this.deletedPost.emit(this.post);
          }
        });
      }
    });
  }
  formatDate() {
    this.post.date;
    const date = moment(this.post.date);
    this.post.date = date.format('MM-DD-YYYY');
  }
}
