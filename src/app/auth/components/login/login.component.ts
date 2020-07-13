import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoader: boolean;
  isValidCredentials: boolean;
  isDisabled: boolean;
  constructor(
    public authService: AuthService,
    public router: Router,
    public sharedDataService: SharedDataService
  ) {
    this.isDisabled = true;
    this.isValidCredentials = true;
    this.isLoader = false;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('main-dashboard');
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.loginForm.valueChanges.subscribe((value) => {
      if (!value.email || !value.password) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    });
  }
  login() {
    this.isLoader = true;
    const url = 'http://localhost:5000/api/auth';
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(url, body).subscribe(
      (response) => {
        if (response.token) {
          this.sharedDataService.setUsertoLocalStorage(response);
          this.isLoader = false;
          this.router.navigateByUrl('/main-dashboard');
        }
      },
      (error) => {
        this.isLoader = false;
        if (error.status === 400) {
          this.isValidCredentials = false;
        }
      }
    );
  }
  signup() {
    this.router.navigateByUrl('/signup');
  }
}
