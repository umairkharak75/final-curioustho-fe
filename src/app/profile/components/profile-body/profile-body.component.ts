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
  questionForm: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.question) {
      this.questionForm = this.fb.group({
        question: this.fb.array([]),
        telephones: this.fb.array([]),
      });
      this.questionForm.setControl('telephones', this.fb.array(this.question));
    }
  }
}
