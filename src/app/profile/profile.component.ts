import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user;
  post;
  question;
  questionForm: FormGroup;
  postForm: FormGroup;
  currentProfileId;
  constructor(
    public sharedData: SharedDataService,
    public profile: ProfileService,
    public _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.question = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.currentProfileId = data.id;
    });
    this.questionForm = new FormGroup({
      question: new FormControl(),
      answer: new FormControl(),
    });

    this.postForm = new FormGroup({
      image: new FormControl(),
    });

    this.user = this.sharedData.getUserFromLs();
    const url = `http://localhost:5000/api/posts/${this.currentProfileId}`;
    this.profile.getAllCurrentPosts(url).subscribe((data) => {
      console.log(data);
      this.post = data;
    });
    this.getAllQuestion();
  }

  addQuestion() {
    const url = `http://localhost:5000/api/question/${this.currentProfileId}`;
    const body = {
      question: this.questionForm.value.question,
    };

    this.profile.addQuestion(url, body).subscribe((response) => {
      this.question.unshift(response);
    });
  }

  getAllQuestion() {
    const url = `http://localhost:5000/api/question/${this.currentProfileId}`;

    this.profile.GetAllAskedQuestion(url).subscribe((response) => {
      this.question = response;
      console.log(response);
    });
  }
  submitAnswer(param) {
    console.log(param);
    const url = `http://localhost:5000/api/question/answer/${param._id}`;

    const body = {
      answer: this.questionForm.value.answer,
    };

    this.profile.sumbitAnswer(url, body).subscribe((response) => {
      this.question = response;
    });
  }

  deleteQuestion(param) {
    const url = `http://localhost:5000/api/question/${param._id}`;
    this.profile.deleteQuestion(url).subscribe((data) => {
      var newQuestion = this.question.filter(function (question) {
        return question._id !== param._id;
      });
      this.question = newQuestion;
    });
  }

  deletedPost() {}

  addNewQuestion() {
    const url = `http://localhost:5000/api/question/${this.currentProfileId}`;
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
}
