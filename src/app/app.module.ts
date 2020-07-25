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

import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';

// {
//   id: FacebookLoginProvider.PROVIDER_ID,
//   provider: new FacebookLoginProvider('Facebook-App-Id')
// },
// {
//   id: LinkedinLoginProvider.PROVIDER_ID,
//   provider: new LinkedinLoginProvider('LINKEDIN_CLIENT_ID')
// }

// const config = new SocialAuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('528961187921-ld24b25466u4t2lacn9r35asg000lfis.apps.googleusercontent.com')
//   },
//   // {
//   //   id: FacebookLoginProvider.PROVIDER_ID,
//   //   provider: new FacebookLoginProvider('561602290896109')
//   // },
//   // {
//   //   id: LinkedInLoginProvider.PROVIDER_ID,
//   //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
//   // }
// ]);
// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashbardComponent,
    LoginComponent,
    CreateProfileComponent,
    AskQuestionComponent,
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

    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: true})
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
