import { SharedModule } from './../shared/shared.module';
import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { PostService } from './services/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MainDashboardComponent],
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
    SharedModule,
  ],

  providers: [PostService, SharedDataService],
})
export class MainDashboardModule {}
