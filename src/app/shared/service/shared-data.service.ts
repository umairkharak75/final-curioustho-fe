import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  link: string;
  user;
  constructor() {}

  getToken() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      return this.user.token;
    }
  }
  getUser() {
    return localStorage.getItem('user');
  }

  setUsertoLocalStorage(user) {
    const userData = {
      email: user.user.email,
      id: user.user.id,
      link: user.user.link,
      token: user.token,
    };

    localStorage.setItem('user', JSON.stringify(userData));
  }
}
