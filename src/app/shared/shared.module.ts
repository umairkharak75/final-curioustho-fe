import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { CreatePostComponent } from '../shared/components/create-post/create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PostService } from './../main-dashboard/services/post.service';
import { ConfirmationModalComponent } from '../shared/components/post/confirmation-modal/confirmation-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserModule } from '@angular/platform-browser';
import { PostComponent } from './components/post/post.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    HeaderComponent,
    PostComponent,
    ConfirmationModalComponent,
    CreatePostComponent,
  ],
  entryComponents: [ConfirmationModalComponent],
  imports: [
    MatMomentDateModule,
    MatSliderModule,
    CommonModule,
    MatSnackBarModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatBadgeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    ClipboardModule,
  ],
  exports: [
    MatMomentDateModule,
    HeaderComponent,
    MatSnackBarModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    CreatePostComponent,
    NgxSpinnerModule,
    MatBadgeModule,
    PostComponent,
    ConfirmationModalComponent,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [PostService],
})
export class SharedModule {}
