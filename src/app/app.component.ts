import { SharedDataService } from 'src/app/shared/service/shared-data.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}

  constructor(public sharedDataService: SharedDataService) {}
}
