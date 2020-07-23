import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedDataService } from './../../../shared/service/shared-data.service';
import { ApiService } from './../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  user;
  selectedLanguage;
  userSettings;
  httpsPattern: '^(https?://)*[a-z0-9-]+(.[a-z0-9-]+)+(/[a-z0-9-]+)*/?$';
  isDisbaled;
  profileSettings: FormGroup;
  constructor(
    public api: ApiService,
    public sharedDataService: SharedDataService,
    public snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileSettings = new FormGroup({
      dateOfBirt: new FormControl(),
      username: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      facebook: new FormControl(Validators.pattern(this.httpsPattern)),
      twitter: new FormControl(Validators.pattern(this.httpsPattern)),
      linkedIn: new FormControl(Validators.pattern(this.httpsPattern)),
      instagram: new FormControl(Validators.pattern(this.httpsPattern)),
    });
    this.profileSettings.valueChanges.subscribe((value) => {
      if (this.profileSettings.hasError) {
        this.isDisbaled === true;
      } else {
        this.isDisbaled === false;
      }
    });
    this.user = this.sharedDataService.getUserFromLs();
    this.getUserSettings(this.user.id);
  }

  getUserSettings(id) {
    const url = `http://localhost:5000/api/users/findSpecificUser/${id}`;
    this.api.getData(url).subscribe((response) => {
      this.userSettings = response.users[0];
      console.log(this.userSettings);
      this.profileSettings.patchValue({
        username: this.userSettings.userName || '',
        phone: this.userSettings.phone || '',
        email: this.userSettings.email || '',
        facebook: this.userSettings.social.facebook,
        twitter: this.userSettings.social.twitter || '',
        linkedIn: this.userSettings.social.linkedIn || '',
        instagram: this.userSettings.social.instagram || '',
      });
    });
  }

  submit() {
    const body = {
      userName: this.profileSettings.value.username,
      email: this.profileSettings.value.email,
      facebook: this.profileSettings.value.facebook,
      twitter: this.profileSettings.value.twitter,
      linkedIn: this.profileSettings.value.linkedIn,
      instagram: this.profileSettings.value.instagram,
    };

    const url = `http://localhost:5000/api/users/profileSettings/${this.user.id}`;
    this.api.patchData(url, body).subscribe((data) => {
      if (data.msg === 'Updated Successfully') {
        this.openSnackBar('Successfully Updated', 'Done');
      }
    });
  }

  openSnackBar(message, action: string) {
    this.snack.open(message, action, {
      duration: 2000,
    });
  }
}
