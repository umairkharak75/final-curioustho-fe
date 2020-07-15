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

  getProvider() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      return this.user.provider;
    }
  }

  getId() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      return this.user.id;
    }
  }

  getUser() {
    return localStorage.getItem('user');
  }
  getUserFromLs() {
    return JSON.parse(localStorage.getItem('user'));
  }
  setUsertoLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
