import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.css']
})
export class MessageInboxComponent implements OnInit {

  question;
  user;
  model: any = {};
  panelOpenState = true;
  constructor(
    public profile: ProfileService,
    public sharedData: SharedDataService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.sharedData.getUserFromLs();

    this.getAllQuestion();
  }

  getAllQuestion() {
    const url = `http://localhost:5000/api/question/${this.user.id}`;

    this.profile.GetAllAskedQuestion(url).subscribe((response) => {
      console.log(this.question)
      this.question = response;
      console.log(response);
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
        question.visibleStatus = false;
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
