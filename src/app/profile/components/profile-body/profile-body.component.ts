import { ProfileService } from './../../service/profile.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.css'],
})
export class ProfileBodyComponent implements OnInit {
  @Input() question;
  @Input() post;
  @Input() user;
  questionForm: any;
  model: any = {};
  constructor(private fb: FormBuilder, public profile: ProfileService) {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      question: new FormControl(),
      answer: new FormControl(),
    });
  }

  submitAnswer(question, answer) {
    console.log(answer);
    const id = question._id;

    const index = this.question.findIndex((question) => question._id === id);

    const url = `http://localhost:5000/api/question/answer/${question._id}`;
    const body = {
      answer: answer,
    };
    this.profile.sumbitAnswer(url, body).subscribe((response) => {
      if (response.msg === 'success') {
        question.answer = answer;
        question.visibleStatus = true;
      }
      this.question[index] = question;
    });
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
