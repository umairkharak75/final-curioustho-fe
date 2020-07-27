import { ApiService } from './../core/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  profileForm;
  answersCount;
  @ViewChild('txtConfigFile') txtConfigFile: ElementRef;
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
    console.log('checl')
    this.spinner.show();
    this.fetchAllusers();

    this.route.params.subscribe((data) => {
      console.log('checl')

      this.currentProfileId = data.id;
      this.post = [];
      this.question = [];
      this.hasloader = true;
      const url = `api/posts/${this.currentProfileId}`;
      this.profile.getAllCurrentPosts(url).subscribe((data) => {
        this.post = data;
      });
      this.getAllQuestion();
      //this.getReviewAvg();
    });

    this.questionForm = new FormGroup({
      question: new FormControl(),
      answer: new FormControl(),
    });

    this.postForm = new FormGroup({
      image: new FormControl(),
    });

    this.user = this.sharedData.getUserFromLs();
    console.log(this.user)

    if (this.currentProfileId !== this.user.id) {
      this.fetchProfileUser();
    } else {
      this.profileImage = this.user.profilePic;
      
      this.profileName = this.user.name;
    }
    const url = `api/posts/${this.currentProfileId}`;
    this.profile.getAllCurrentPosts(url).subscribe((data) => {
      this.post = data;
    });
    this.getAllQuestion();

    this.profileForm = new FormGroup({
      copyUrl: new FormControl(this.user.askQuestionLink),
    });
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

    const user={name:this.user.name,
      profilePic:this.user.profilePic,
      _id:this.user.id
    }
    params.user=user
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

  // getReviewAvg() {
  //   const url = `api/posts/avg/${this.currentProfileId}`;
  //   this.api.getData(url).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  successCopyMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.profileForm.get('copyUrl').value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.openSnackBar('Copied successfully', 'Done');
  }
}
