import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PersonaRequest, PersonaResponse } from '../interfaces/persona';
import { LoginService } from './login.service';
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  header: HttpHeaders | null = null
  constructor(private http: HttpClient, private loginService: LoginService) { 
  }
  
  getPersona(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(Rutas.PERSONA)
  }
  
  editPersona(persona: FormGroup): Observable<PersonaResponse> {
    this.header = this.loginService.header
    return this.http.put<PersonaResponse>(Rutas.PERSONA, persona, {
      headers: this.header
    })
  }
  
}
