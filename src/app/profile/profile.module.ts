import { SharedModule } from './../shared/shared.module';
import { PostService } from './../main-dashboard/services/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { ProfileBodyComponent } from './components/profile-body/profile-body.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { InboxComponent } from './components/inbox/inbox.component';

@NgModule({
  declarations: [ProfileComponent, LeftSideBarComponent, ProfileBodyComponent, AskQuestionComponent, InboxComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    SharedModule,
  ],
  providers: [PostService],
})
export class ProfileModule {}
