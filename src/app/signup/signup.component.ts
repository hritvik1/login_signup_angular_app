import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  private newUser = {
    userName: '',
    email: '',
    address: '',
    phoneNo: null,
    pass: ''
  };

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private customValidator: ValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', Validators.compose([Validators.required, this.customValidator.nameLengthValidator()])],
      email: ['', Validators.compose([Validators.required, this.customValidator.emailValidator()])],
      address: [''],
      phoneNumber: ['', Validators.compose([Validators.required, this.customValidator.contactValidator()])],
      pass: ['', Validators.compose([Validators.required, this.customValidator.passValidator()])],
      confirmPass: ['', Validators.required]
    }, {validator: this.customValidator.matchPassword('pass', 'confirmPass')}
    );
  }

  get signupFormData(): any {
    return this.signupForm.controls;
  }

  public signup(data: any): void {
    this.newUser.userName = data.userName;
    this.newUser.email = data.email;
    this.newUser.address = data.address;
    this.newUser.phoneNo = data.phoneNumber;
    this.newUser.pass = data.pass;
    this.localStorageService.setItem(data.email, JSON.stringify(this.newUser));
  }

  onSubmit(): any {
    if (this.signupForm.valid) {
      this.signupForm.reset();
      alert('Account Created Successfully 👍');
      this.router.navigate(['login']);
    }
  }
}
