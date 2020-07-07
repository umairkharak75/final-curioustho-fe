import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './../../core/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);


  constructor(public apiService: ApiService) { }
  addNewUser(url, body):Observable<any>{
     return this.apiService.postData(url, body )
  }
  getAuthenticatedStatus(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  setUsertoLocalStorage(user){
    localStorage.setItem('token', user.token);
    localStorage.setItem('isLoggedIn','true')
    localStorage.setItem('link',user.user.link)
    this.isLoggedIn=true
    this.isAuthenticated$.next(true)

  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  login(url,body){
    return this.apiService.postData(url,body)
  }
 
}
