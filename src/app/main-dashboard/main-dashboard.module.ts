import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { PostService } from './services/post.service';
import { HeaderComponent } from './../core/components/header/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/post/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SocialAuthService } from 'angularx-social-login';

@NgModule({
  declarations: [
    MainDashboardComponent,
    CreatePostComponent,
    PostComponent,
    HeaderComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    ClipboardModule,
    ImageCropperModule,
    MatDialogModule,
  ],
  providers: [PostService, SharedDataService, SocialAuthService],
  entryComponents: [ConfirmationModalComponent],
})
export class MainDashboardModule {}
