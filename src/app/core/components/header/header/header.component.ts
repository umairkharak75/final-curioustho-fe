import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() loggedUser;
  constructor(public route: Router) {}

  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/');
  }
}
