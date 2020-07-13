import { ApiService } from './../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class PostService {
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
}
