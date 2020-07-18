import { ApiService } from './../core/services/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { PostService } from './services/post.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(
    public postService: PostService,
    public sharedData: SharedDataService,
    public router: Router,
     public api:ApiService
  ) {}

  ngOnInit(): void {
    this.fetchAllusers()
    
    this.user = JSON.parse(this.sharedData.getUser());
    this.askQuestionLink = this.user.askQuestionLink;
    console.log(this.askQuestionLink);
    const token = this.user.token;
    const url = 'http://localhost:5000/api/posts';
    this.postService.getAllPosts(url).subscribe((response) => {
      this.post = response;
    });
  }

  deletedPost(deletedpost) {
    console.log(deletedpost)
    var newPost = this.post.filter(function (post) {
      return post._id !== deletedpost._id;
    });
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
}
