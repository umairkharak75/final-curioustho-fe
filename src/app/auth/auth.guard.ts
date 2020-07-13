import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user;
  constructor(
    private auth: AuthService,
    public sharedService: SharedDataService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //debugger
    if (this.sharedService.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
