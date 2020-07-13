import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  formData;
  postForm: FormGroup;
  isImage: boolean;
  imgUrl;
  @Output() postAdded = new EventEmitter();

  constructor(public postService: PostService) {}
  ngOnInit() {
    this.isImage = false;
    this.postForm = new FormGroup({
      image: new FormControl(),
    });
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    if (event.target.files[0]) {
      this.isImage = true;
      this.formData = new FormData();
      this.formData.append('productImage', event.target.files[0]);
      this.formData.append('name', 'asdasdsad');
      this.formData.append('price', 12);
      this.imageChangedEvent = event;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        console.log(this.imgUrl);
      };
    } else {
      this.isImage = false;
    }
  }

  imageCropped(image) {
    // console.log(file.name);
    // file.name = image.base64;
    // this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  upload() {
    this.postForm.get('image').setValue('');
    const url = 'http://localhost:5000/api/posts';
    this.postService.createPost(url, this.formData).subscribe((response) => {
      if (response) {
        this.postForm.get('image').setValue('');
        this.isImage = false;
        this.postAdded.emit(response.createdPost);
      }
    });
  }

  addFile() {
    document.getElementById('selectedFile').click();
  }
}
