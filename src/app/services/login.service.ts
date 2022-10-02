import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { LoginRequest, LoginResponse } from '../interfaces/login';
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(request: FormGroup): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(Rutas.LOGIN, request)
  }

  deslogear() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  checkisLogged() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login'])
    }
  }

  get header() {
      if (!this.token) this.router.navigate(['login'])
      return new HttpHeaders().append('Authorization', this.token)
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
}
