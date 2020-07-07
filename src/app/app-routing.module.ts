import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashbardComponent } from './dashboard/dashbard/dashbard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';



const routes: Routes = [

{path:'',
component:LoginComponent},
{path:'signup',
component:SignupComponent},
{path:'dashboard',
canActivate: [AuthGuard],
component:DashbardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
