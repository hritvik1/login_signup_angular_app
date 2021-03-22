import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  login(): any {
    this.router.navigateByUrl('/login');
  }

  signup(): any {
    this.router.navigateByUrl('/signup');
  }

  loginStatus(): any {
    if (this.localStorageService.getItem('loggedInUser') != null) {
      return true;
    } else {
      return false;
    }
  }

  logout(): any {
    this.localStorageService.removeItem('loggedInUser');
    this.router.navigateByUrl('/login');
  }

  deleteAccount(): void {
    const conf = confirm('Are you sure you want to delete your account!!!!');
    if (conf === true) {
      const tempData = this.localStorageService.getObj('loggedInUser');
      this.localStorageService.removeItem(tempData.email);
      this.logout();
    }
  }

  errorPage(): any {
    if (this.localStorageService.getItem('errorPageObj') != null) {
      return true;
    } else {
      return false;
    }
  }
}
