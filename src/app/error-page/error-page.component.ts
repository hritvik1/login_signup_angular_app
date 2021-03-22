import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})

export class ErrorPageComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.localStorageService.getItem('foo')) {
      this.localStorageService.setItem('foo', 'no reload');
      location.reload();
    } else {
      this.localStorageService.removeItem('foo');
    }
    this.localStorageService.setItem('errorPageObj', 'true');
  }

  toHomepage(): any {
    this.localStorageService.removeItem('errorPageObj');
    if (this.localStorageService.getItem('loggedInUser') != null) {
      this.localStorageService.removeItem('loggedInUser');
    }
    this.router.navigate(['login']);
  }
}
