import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.css'],
})
export class MessageInboxComponent implements OnInit {
  question;
  user;
  model: any = {};
  panelOpenState = true;
  constructor(
    public profile: ProfileService,
    public sharedDataService: SharedDataService,
    public sharedData: SharedDataService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.sharedData.getUserFromLs();

    this.getAllQuestion();
  }

  getAllQuestion() {
    const url = `api/question/${this.user.id}`;

    this.profile.GetAllAskedQuestion(url).subscribe((response) => {
      this.question = response;
    });
  }

  submitAnswer(question, answer) {
    const id = question._id;

    const index = this.question.findIndex((question) => question._id === id);

    const url = `api/question/answer/${question._id}`;
    const body = {
      answer: answer,
    };
    this.profile.sumbitAnswer(url, body).subscribe((response) => {
      if (response.msg === 'success') {
        question.answer = answer;
        this.openSnackBar('Successfully Answer Added', 'Done');
      }
    });
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
