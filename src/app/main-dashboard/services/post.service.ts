import { environment } from './../../../environments/environment.prod';
import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getPost: Subject<any>;
  socket = io(`https://sleepy-gorge-55662.herokuapp.com`);

  constructor(public apiService: ApiService) {}

  createPost(url, body) {
    return this.apiService.postImageData(url, body);
  }
  getAllPosts(url) {
    return this.apiService.getData(url);
  }

  postReview(url, body) {
    return this.apiService.postData(url, body);
  }
  deletePost(url) {
    return this.apiService.deleteData(url);
  }

  addPost(data) {
    this.socket.emit('input', data);
  }

  getAddedPost(): Observable<any> {
    let observable = new Observable<{ name: string }>((observer) => {
      this.socket.on('firstTimeCall', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendCurrentLoggedUser(loggedUser) {
    this.socket.emit('sendCurrentLoggedUser', loggedUser);
  }

  getFinalNotification(): Observable<any> {
    let observable = new Observable<{ name: string }>((observer) => {
      this.socket.on('secondTimeCall', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
