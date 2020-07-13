import { CreateProfileComponent } from './auth/components/create-profile/create-profile.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'create-profile',
    canActivate: [AuthGuard],
    component: CreateProfileComponent,
  },
  {
    path: 'main-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main-dashboard/main-dashboard.module').then(
        (m) => m.MainDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
