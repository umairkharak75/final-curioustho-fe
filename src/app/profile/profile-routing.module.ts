import { InboxComponent } from './components/inbox/inbox.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: ':id', component: ProfileComponent },
  { path: 'ask/:id', component: AskQuestionComponent },
  { path: 'inbox', component: InboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
