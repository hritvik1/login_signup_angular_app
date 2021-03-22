import { Component, OnInit } from '@angular/core';
import { CookieStorageService } from '../services/cookie-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})

export class ErrorPageComponent implements OnInit {

  constructor(
    private cookieStorageService: CookieStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.cookieStorageService.checkCookie('foo')) {
      this.cookieStorageService.setItem('foo', 'no reload');
      location.reload();
    } else {
      this.cookieStorageService.removeItem('foo');
    }
    this.cookieStorageService.setItem('errorPageObj', 'true');
  }

  toHomepage(): void {
    this.cookieStorageService.removeItem('errorPageObj');
    if (this.cookieStorageService.checkCookie('loggedInUser')) {
      this.cookieStorageService.removeItem('loggedInUser');
    }
    this.router.navigate(['login']);
  }
}
