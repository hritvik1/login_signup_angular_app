import { Component, OnInit } from '@angular/core';
import { CookieStorageService } from '../services/cookie-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private cookieStorageService: CookieStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.cookieStorageService.checkCookie('loggedInUser')) {
      this.router.navigateByUrl('/login');
    }
  }

  getUsrValues(): any {
    return this.cookieStorageService.getObj('loggedInUser');
  }
}
