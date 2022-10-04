import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup
  message: string | null = null

  constructor(private service: LoginService, private fb: FormBuilder, private router: Router) { 
    this.form = this.fb.group<LoginRequest>({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.service.login(this.form.value).subscribe({
      next: (data: LoginResponse) => {
        localStorage.setItem('token', `Bearer ${data.token}`)
      },
      error: (error: HttpErrorResponse) => {
        this.message = 'Login Failed'
        setTimeout(() => {
          this.message = null
        }, 3000);
      },
      complete: () => {
        this.router.navigate(['admin'])
      }
    })
  }

}
