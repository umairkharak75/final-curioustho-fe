import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(public apiService: ApiService) {}

  getAllCurrentPosts(url) {
    return this.apiService.getData(url);
  }

  addQuestion(url, body) {
    return this.apiService.postData(url, body);
  }

  GetAllAskedQuestion(url) {
    return this.apiService.getData(url);
  }
  sumbitAnswer(url, body) {
    return this.apiService.patchData(url, body);
  }
  deleteQuestion(url) {
    return this.apiService.deleteData(url);
  }
}
