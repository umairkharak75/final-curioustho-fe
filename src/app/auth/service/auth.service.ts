import { ApiService } from './../../core/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public apiService: ApiService) {}
  addNewUser(url, body): Observable<any> {
    return this.apiService.postData(url, body);
  }
  getAuthenticatedStatus(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  // tslint:disable-next-line: typedef
  setUsertoLocalStorage(user) {
    const userData = {
      email: user.user.email,
      id: user.user.id,
      link: user.user.link,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(localStorage.getItem('user'));
    localStorage.setItem('token', user.token);
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
    this.isAuthenticated$.next(true);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  login(url, body) {
    return this.apiService.postData(url, body);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
