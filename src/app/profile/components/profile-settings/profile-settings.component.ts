import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedDataService } from './../../../shared/service/shared-data.service';
import { ApiService } from './../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  user;
  dateOfBirth;
  selectedLanguage;
  progress;
  uploadedImage;
  formData;
  hasDateOfBirth;
  imgUrl;
  hasDuplicateUserName;
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
    this.hasDuplicateUserName = false;
    this.hasDateOfBirth = true;
    this.profileSettings = new FormGroup({
      profilePic: new FormControl(),
      dateOfBirt: new FormControl(),
      userName: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      name: new FormControl(),
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
    this.imgUrl=this.user.profilePic
    console.log(this.imgUrl)
    this.getUserSettings(this.user.id);
  }

  getUserSettings(id) {
    const url = `api/users/findSpecificUser/${id}`;
    this.api.getData(url).subscribe((response) => {
      this.userSettings = response.users[0];

      this.profileSettings.patchValue({
        userName: this.userSettings.userName || '',
        dateOfBirth: this.userSettings.dateOfBirth || '',
        email: this.userSettings.email || '',
        facebook: this.userSettings.social.facebook || '',
        twitter: this.userSettings.social.twitter || '',
        linkedIn: this.userSettings.social.linkedIn || '',
        instagram: this.userSettings.social.instagram || '',
        name: this.userSettings.name,
      });
    });
  }

  submit() {
    if (!this.profileSettings.value.dateOfBirth) {
      this.hasDateOfBirth = false;
      return;
    }
    const body = {
      userName: this.profileSettings.value.userName,
      name: this.profileSettings.value.name,
      dateOfBirth: this.profileSettings.value.dateOfBirth._d || '',
      email: this.profileSettings.value.email,
      facebook: this.profileSettings.value.facebook,
      twitter: this.profileSettings.value.twitter,
      linkedIn: this.profileSettings.value.linkedIn,
      instagram: this.profileSettings.value.instagram,
    };

    const url = `api/users/profileSettings/${this.user.id}`;
    this.api.patchData(url, body).subscribe((data) => {
      if (data.error == 409) {
        this.openSnackBar('Username already exists', 'Error');
        this.hasDuplicateUserName = true;
      }
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
  dateChange(params) {
    let date = moment(this.profileSettings.value.dateOfBirth._d);
    this.dateOfBirth = date;
  }

  upload() {
    this.profileSettings.get('profilePic').setValue('');
    document.getElementById('closeImageModal').click();

    const url = 'api/users/updateProfilePic';
    this.api
      .postProfilePic(url, this.formData)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            this.user.profilePic = event.body.user.profilePic;
            console.log(this.user)
            this.sharedDataService.setUsertoLocalStorage(this.user);
            this.imgUrl = this.user.profilePic;
            console.log(this.user.profilePic);
            this.profileSettings.get('profilePic').setValue('');

            setTimeout(() => {
              this.progress = 0;
              this.openSnackBar('Successfully Post Added', 'Done');
            }, 1500);
        }
      });
  }
  fileChangeEvent(event: any): void {
    if (event.target.files[0]) {
      document.getElementById('update_profile_image').click();
      this.uploadedImage = event.target.files[0];
      //    document.getElementById('post').click();

      // this.isImage = true;
      this.formData = new FormData();
      this.formData.append('productImage', event.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    } else {
    }
  }
  fileInput(){
    document.getElementById('selectedFile').click();

  }
  cancelUpdatePic(){
    this.profileSettings.get('profilePic').reset()
    this.imgUrl=this.user.profilePic
  }
}
