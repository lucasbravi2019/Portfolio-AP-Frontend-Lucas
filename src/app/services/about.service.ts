import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { AboutRequest, AboutResponse } from '../interfaces/about';
import { PersonaResponse } from '../interfaces/persona';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  header: HttpHeaders
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  editAbout(about: AboutRequest): Observable<AboutResponse> { 
    return this.http.put<AboutResponse>(Rutas.ABOUT, about, {
      headers: this.header
    })
  }
}
