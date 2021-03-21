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

  onLogin(data: any): any {
    if (this.loginForm.valid && this.customValidator.loginValidate(data.email, data.pass)) {
      alert('Login Successful 👍');
      this.router.navigate(['usrDboard']);
    }
    this.loginForm.reset();
  }
}
