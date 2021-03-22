import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CookieStorageService {

  constructor(
    private cookieService: CookieService
  ) { }

  public setItem(key: string, value: string): void {
    this.cookieService.set(key, value);
  }

  public getItem(key: string): any {
    return this.cookieService.get(key);
  }

  public removeItem(key: string): void {
    this.cookieService.delete(key);
  }

  public getObj(key: string): any {
    return JSON.parse(this.getItem(key));
  }

  public checkCookie(key: string): any {
    return this.cookieService.check(key);
  }
}
