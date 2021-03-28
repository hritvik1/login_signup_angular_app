import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidator: ValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onLogin(data: any): void {
    const status = this.customValidator.loginValidate(data.email.toLowerCase(), data.pass);
    if (this.loginForm.valid && status === 'ok') {
      alert('Login Successful 👍');
      this.router.navigate(['usrDboard']);
    } else if (status === 'emailNotExist') {
      this.loginForm.reset();
    } else if (status === 'passInvalid') {
      this.loginForm.controls.pass.reset();
    }
  }
}
