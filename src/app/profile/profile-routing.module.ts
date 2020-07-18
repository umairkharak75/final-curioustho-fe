import { MessageInboxComponent } from './components/message-inbox/message-inbox.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { InboxComponent } from './components/inbox/inbox.component';

const routes: Routes = [
  { path: ':id', component: ProfileComponent },
  { path: 'ask/:id', component: AskQuestionComponent },
  {path: 'inbox/user',component:MessageInboxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
