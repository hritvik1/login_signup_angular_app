import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getObj(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public checkStorage(key: string): boolean {
    if (localStorage.getItem(key) != null) {
      return true;
    } else {
      return false;
    }
  }
}
