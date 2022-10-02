import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup

  constructor(private service: LoginService, private fb: FormBuilder) { 
    this.form = this.fb.group<LoginRequest>({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.service.login(this.form.value)
  }

}
