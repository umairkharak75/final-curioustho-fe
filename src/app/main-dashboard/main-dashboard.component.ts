import { ApiService } from './../core/services/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { PostService } from './services/post.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  post;
  user;
  askQuestionLink;
  allUsers
  hasSpinner
  constructor(
    public postService: PostService,
    public sharedData: SharedDataService,
    public router: Router,
     public api:ApiService,
     public spinner: NgxSpinnerService,
     public _snackBar: MatSnackBar,
     ) {}

  ngOnInit(): void {
    
    this.fetchAllusers()
    
    this.user = JSON.parse(this.sharedData.getUser());
    this.askQuestionLink = this.user.askQuestionLink;
    console.log(this.askQuestionLink);
    const token = this.user.token;
    const url = 'http://localhost:5000/api/posts';
    this.spinner.show()
    this.hasSpinner=true
    this.postService.getAllPosts(url).subscribe((response) => {
      this.post = response;
      this.hasSpinner=true
      this.spinner.hide()
    });
  }

  deletedPost(deletedpost) {
    var newPost = this.post.filter(function (post) {
      return post._id !== deletedpost._id;
    
    
    });
    this.openSnackBar('Successfully deleted ', 'Done');
    this.post = newPost;
  }
  newPostAdded(params) {
    this.post.unshift(params);
  }
  routeToProfile() {
    console.log(this.user.link);
    this.router.navigateByUrl(`profile/${this.user.id}`);
  }

  fetchAllusers(){
    const url='http://localhost:5000/api/users/allUser'
     this.api.getData(url).subscribe(response=>{

      this.allUsers=response.users
     })


  }

  navigateToProfile(id){
    this.router.navigateByUrl(`profile/${id}`)
  }
  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
