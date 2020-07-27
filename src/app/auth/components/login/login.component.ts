import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ɵConsole,
  NgZone,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';

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
  auth2;
  Name;
  show;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  constructor(
    public authService: AuthService,
    public router: Router,
    private ngZone: NgZone,
    @Inject(DOCUMENT) document,

    public sharedDataService: SharedDataService
  ) {
    this.isDisabled = true;
    this.isValidCredentials = true;
    this.isLoader = false;
  }

  ngOnInit(): void {
    this.googleInitialize();
    this.fbLibrary();

    $(document).ready(function () {
      $('#section2').hide();
    });
    function changeSection(id) {
      if (id === 1) {
        var new_id = 2;
      } else {
        var new_id = 1;
      }
      $('#section' + id).hide();
      $('#section' + new_id).show();
    }

    const user = this.sharedDataService.getUserFromLs();
    if (user) {
      if (user.token) {
        this.router.navigateByUrl('home');
      }
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
    const url = 'api/auth';
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

  signup() {
    this.router.navigateByUrl('/signup');
  }

  generateSocaialUuserToken(body) {
    const url = 'api/auth';
    this.authService.login(url, body).subscribe((response) => {
      const user = {
        token: response.token,
        email: response.user.email,
        id: response.user.id,
        link: response.user.link,
        name: response.user.name,
        idToken: response.idToken,
        askQuestionLink: response.user.askQuestionLink,
        profilePic: response.user.profilePic,
        social: response.user.social,
      };
      this.sharedDataService.setUsertoLocalStorage(user);
      this.isLoader = false;
      this.ngZone.run(() => this.router.navigateByUrl('home')).then();
      //this.router.navigateByUrl('/create-profile');
    });
  }

  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id:
            '1067301653775-t188c9ip3n9ffe5ia2gv7qhjkr9ma9c5.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
        });
        this.prepareLogin();
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }
  prepareLogin() {
    this.auth2.attachClickHandler(
      document.getElementById('loginRef'),
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        this.show = true;
        this.Name = profile.getName();
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        const user = {};
        const body = {
          email: profile.getEmail(),
          password: '123456',
          id: profile.getId(),
          provider: 'Google',
          name: profile.getName(),
          profilePic: profile.getImageUrl(),
        };

        this.generateSocaialUuserToken(body);
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  fbLibrary() {
    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '309424153753158',
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });
      window['FB'].AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  fbLogin() {
    window['FB'].login(
      (response) => {
        console.log('login response', response);
        if (response.authResponse) {
          window['FB'].api(
            '/me',
            {
              fields: 'last_name, first_name, email, name,picture',
            },
            (userInfo) => {
              console.log('user information');
              console.log(userInfo);
              const body = {
                email: userInfo.email,
                password: '123456',
                id: userInfo.id,
                provider: 'Facebook',
                name: userInfo.name,
                profilePic: userInfo.picture.data.url,
              };
              this.generateSocaialUuserToken(body);
            }
          );
        } else {
          console.log('User login failed');
        }
      },
      { scope: 'email' }
    );
  }

  routeToCreate(){
    console.log('check')
    this.router.navigateByUrl('/create-profile')
  }
}
