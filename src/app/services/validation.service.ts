import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CookieStorageService } from './cookie-storage.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {

  constructor(
    private cookieStorageService: CookieStorageService,
    private localStorageService: LocalStorageService
  ) { }

  nameLengthValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
      if (!control.value) {
        return null;
      } else if (control.value.length < 3) {
        return { invalidLength: true };
      }
    };
  }

  emailValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
      if (!control.value) {
        return null;
      } else if (this.localStorageService.checkStorage(control.value)) {
        return { duplicateEmail: true };
      } else {
        const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
        const valid = regex.test(control.value);
        return valid ? null : {invalidEmail: true};
      }
    };
  }

  contactValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]{10}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidContactNo: true };
    };
  }

  passValidator(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPass: true };
    };
  }

  matchPassword(pass: string, confirmPass: string): any {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[pass];
      const confirmPasswordControl = formGroup.controls[confirmPass];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  loginValidate(email: string, pass: string): string {
    if (this.localStorageService.checkStorage(email)) {
      const tempData = this.localStorageService.getObj(email);
      if (tempData.pass === pass) {
        this.cookieStorageService.setItem('loggedInUser', JSON.stringify(tempData));
        return 'ok';
      } else {
        alert('Invalid Credentials, try again!!!');
        return 'passInvalid';
      }
    } else {
      alert('No Matching Credentials Found!!!!');
      return 'emailNotExist';
    }
  }
}
