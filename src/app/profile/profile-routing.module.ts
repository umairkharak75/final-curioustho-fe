import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessageInboxComponent } from './components/message-inbox/message-inbox.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: ':id', component: ProfileComponent },
  { path: 'inbox/user', component: MessageInboxComponent },
  { path: 'notification/user', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
