import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  user;
  constructor(public sharedService: SharedDataService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser();
  }
  onFileChanged(params) {
    console.log(params);
  }
}
