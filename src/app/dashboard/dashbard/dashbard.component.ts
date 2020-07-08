import { SharedDataService } from './../../shared/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css']
})
export class DashbardComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  copyLink:FormGroup
  constructor(public sharedDataService:SharedDataService) { }
link:string
  ngOnInit(): void {
    this.link=localStorage.getItem('link')
    
    console.log(this.link)
    this.copyLink=new FormGroup({
      link:new FormControl(this.link)
    })
  }
  

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  } 
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  
}
