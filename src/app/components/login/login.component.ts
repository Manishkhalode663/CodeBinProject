import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ])
  LoginForm = new FormGroup({
    email: this.email,
    password: this.password
  })


  constructor(private authService: AuthService) { }
  login() {
    this.authService.loginUser(this.LoginForm.value.email!, this.LoginForm.value.password!)

  }
  reset() {
    console.log(this.LoginForm.value);
  }
}
