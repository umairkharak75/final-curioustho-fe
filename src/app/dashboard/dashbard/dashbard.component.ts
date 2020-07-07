import { SharedDataService } from './../../shared/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css']
})
export class DashbardComponent implements OnInit {
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
  
}
