import { ProfileService } from './../../service/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent implements OnInit {
  questionForm;
  userId;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public profile: ProfileService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params.id;
    });
    this.questionForm = new FormGroup({
      question: new FormControl(),
    });
  }

  addQuestion() {
    const url = `http://localhost:5000/api/question/${this.userId}`;
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
  navigateToProfile() {
    this.router.navigateByUrl('');
  }
}
