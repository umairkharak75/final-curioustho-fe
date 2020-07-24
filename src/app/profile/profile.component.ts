import { ApiService } from './../core/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user;
  post;
  question;
  allUsers;
  questionForm: FormGroup;
  postForm: FormGroup;
  currentProfileId;
  profileImage;
  profileName;
  hasloader;
  answersCount;
  constructor(
    public sharedData: SharedDataService,
    public profile: ProfileService,
    public _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public router: Router,
    public api: ApiService,
    public spinner: NgxSpinnerService
  ) {
    this.question = [];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.fetchAllusers();

    this.route.params.subscribe((data) => {
      this.currentProfileId = data.id;
      this.post = [];
      this.question = [];
      this.hasloader = true;
      const url = `api/posts/${this.currentProfileId}`;
      this.profile.getAllCurrentPosts(url).subscribe((data) => {
        this.post = data;
      });
      this.getAllQuestion();
      this.getReviewAvg();
    });

    this.questionForm = new FormGroup({
      question: new FormControl(),
      answer: new FormControl(),
    });

    this.postForm = new FormGroup({
      image: new FormControl(),
    });

    this.user = this.sharedData.getUserFromLs();

    if (this.currentProfileId !== this.user.id) {
      this.fetchProfileUser();
    } else {
      this.profileImage = this.user.profielPic;
      this.profileName = this.user.name;
    }
    const url = `api/posts/${this.currentProfileId}`;
    this.profile.getAllCurrentPosts(url).subscribe((data) => {
      this.post = data;
    });
    this.getAllQuestion();
  }

  addQuestion() {
    const url = `api/question/${this.currentProfileId}`;
    const body = {
      question: this.questionForm.value.question,
    };

    this.profile.addQuestion(url, body).subscribe((response) => {
      this.question.unshift(response);
    });
  }

  getAllQuestion() {
    this.answersCount = 0;
    const url = `api/question/${this.currentProfileId}`;

    this.profile.GetAllAskedQuestion(url).subscribe((response) => {
      this.question = response;
      this.question.forEach((question) => {
        if (question.visibleStatus) {
          this.answersCount++;
        }
      });
      this.hasloader = false;
    });
  }
  submitAnswer(param) {
    const url = `api/question/answer/${param._id}`;

    const body = {
      answer: this.questionForm.value.answer,
    };

    this.profile.sumbitAnswer(url, body).subscribe((response) => {
      this.question = response;
    });
  }

  deleteQuestion(param) {
    const url = `api/question/${param._id}`;
    this.profile.deleteQuestion(url).subscribe((data) => {
      var newQuestion = this.question.filter(function (question) {
        return question._id !== param._id;
      });
      this.question = newQuestion;
    });
  }

  deletedPost() {}

  addNewQuestion() {
    const url = `api/question/${this.currentProfileId}`;
    const body = {
      question: this.questionForm.value.question,
    };
    this.profile.addQuestion(url, body).subscribe((response) => {
      // this.question.unshift(response);
      this.questionForm.get('question').reset();
      this.openSnackBar('Successfully added ', 'Done');
    });
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deletedPosts(deletedpost) {
    var newPost = this.post.filter(function (post) {
      return post._id !== deletedpost._id;
    });
    this.openSnackBar('Successfully deleted ', 'Done');
    this.post = newPost;
  }

  newPostAdded(params) {
    this.post.unshift(params);
  }
  fetchAllusers() {
    const url = 'api/users/allUser';
    this.api.getData(url).subscribe((response) => {
      console.log(response);
      this.allUsers = response.users;
    });
  }
  fetchProfileUser() {
    const url = `api/users/findSpecificUser/${this.currentProfileId}`;

    this.api.getData(url).subscribe((response) => {
      if (response) {
        this.profileImage = response.users[0].profilePic;
        this.profileName = response.users[0].name;
      }
    });
  }
  navigateToProfile(user) {
    this.profileImage = user.profilePic;
    this.profileName = user.name;
    this.router.navigateByUrl(`profile/${user._id}`);
  }
  profileClicked() {
    this.profileImage = this.user.profielPic;
    this.profileName = this.user.name;
  }

  getReviewAvg() {
    const url = `api/posts/avg/${this.currentProfileId}`;
    this.api.getData(url).subscribe((data) => {
      console.log(data);
    });
  }
}
