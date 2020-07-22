import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { PostService } from 'src/app/main-dashboard/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() user;
  formData;
  postForm: FormGroup;
  isImage: boolean;
  imgUrl;
  progress;

  @Output() postAdded = new EventEmitter();

  constructor(
    public postService: PostService,
    public http: HttpClient,
    public _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.isImage = false;
    this.postForm = new FormGroup({
      image: new FormControl(),
      description: new FormControl(),
    });
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    if (event.target.files[0]) {
      this.isImage = true;
      this.formData = new FormData();
      this.formData.append('productImage', event.target.files[0]);
      console.log(this.formData);
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
    // this.formData.append('description', this.postForm.value.description);
    this.formData.append('description', this.postForm.get('description').value);
    const url = 'http://localhost:5000/api/posts';
    this.postService
      .createPost(url, this.formData)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            this.postForm.get('image').setValue('');
            this.isImage = false;
            this.postAdded.emit(event.body.createdPost);
            setTimeout(() => {
              this.progress = 0;
              this.openSnackBar('Successfully Post Added', 'Done');
            }, 1500);
        }
      });
  }

  addFile() {
    document.getElementById('selectedFile').click();
  }
  uploads() {
    this.http
      .post('http://localhost:5000/api/posts', this.formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        this.openSnackBar('Successfully Answer Added', 'Done');
        console.log(event); // handle event here
      });
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
