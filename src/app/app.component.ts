import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieStorageService } from './services/cookie-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private router: Router,
    private cookieStorageService: CookieStorageService
  ) { }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  signup(): void {
    this.router.navigateByUrl('/signup');
  }

  loginStatus(): boolean {
    return this.cookieStorageService.checkCookie('loggedInUser');
  }

  logout(): void {
    this.cookieStorageService.removeItem('loggedInUser');
    this.router.navigateByUrl('/login');
  }

  deleteAccount(): void {
    const conf = confirm('Are you sure you want to delete your account!!!!');
    if (conf === true) {
      const tempData = this.cookieStorageService.getObj('loggedInUser');
      this.cookieStorageService.removeItem(tempData.email);
      this.logout();
    }
  }

  errorPage(): boolean {
    return this.cookieStorageService.checkCookie('errorPageObj');
  }
}
