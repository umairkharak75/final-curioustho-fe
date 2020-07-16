import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

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
    public socialAuth: SocialAuthService,
    public sharedDataService: SharedDataService
  ) {
    this.isDisabled = true;
    this.isValidCredentials = true;
    this.isLoader = false;
  }

  ngOnInit(): void {
    const user = this.sharedDataService.getUserFromLs();
    if (user.token) {
      this.router.navigateByUrl('main-dashboard');
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.loginForm.valueChanges.subscribe((value) => {
      console.log('check');
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
          const user = {
            email: response.user.email,
            name: '',
            profilePic: '',
            token: response.token,
            id: '',
            provider: '',
            idToken: '',
          };

          this.sharedDataService.setUsertoLocalStorage(user);
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
  signInWithGoogle(): void {
    this.isLoader = true;
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
      this.generateSocaialUuserToken(response);
    });
  }
  signup() {
    this.router.navigateByUrl('/signup');
  }
  signInWithFB() {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.generateSocaialUuserToken(data);
    });
  }

  generateSocaialUuserToken(response) {
    const body = {
      email: response.email,
      password: '123456',
      id: response.id,
      provider: response.provider,
      idToken: response.idToken,
      name: response.name,
    };

    const url = 'http://localhost:5000/api/auth';

    this.authService.login(url, body).subscribe((response) => {
      const user = {
        token: response.token,
        email: response.user.email,
        id: response.user.id,
        link: response.user.link,
        idToken: response.idToken,
        askQuestionLink: response.user.askQuestionLink,
      };

      this.sharedDataService.setUsertoLocalStorage(user);
      this.isLoader = false;
      this.router.navigateByUrl('/main-dashboard');
    });
  }
}
