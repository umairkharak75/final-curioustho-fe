import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashbardComponent } from './dashboard/dashbard/dashbard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CreateProfileComponent } from './auth/components/create-profile/create-profile.component';

import {
  SocialLoginModule,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashbardComponent,
    LoginComponent,
    CreateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    ImageCropperModule,
    SocialLoginModule,
    SharedModule
  ],
  providers: [
    AuthGuard,

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '989732037782-rmgp80ulhurl6off02chhehs1gig9csu.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3215415031886304'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
