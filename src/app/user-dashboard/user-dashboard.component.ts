import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.localStorageService.getItem('loggedInUser') === null) {
      this.router.navigateByUrl('/login');
    }
  }

  getUsrValues(): any {
    return this.localStorageService.getObj('loggedInUser');
  }
}
