import { FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    public sharedData: SharedDataService,
    public profile: ProfileService
  ) {
    this.question = [];
  }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      question: new FormControl(),
      answer: new FormControl(),
    });

    this.user = this.sharedData.getUserFromLs();
    const url = `http://localhost:5000/api/posts/${this.user.id}`;
    this.profile.getAllCurrentPosts(url).subscribe((data) => {
      this.post = data;
    });
    this.getAllQuestion();
  }

  addQuestion() {
    const url = `http://localhost:5000/api/question/${this.user.id}`;
    const body = {
      question: this.questionForm.value.question,
    };
    this.profile.addQuestion(url, body).subscribe((response) => {
      this.question.unshift(response);
      console.log(response);
    });
  }

  getAllQuestion() {
    const url = `http://localhost:5000/api/question/${this.user.id}`;

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
}
