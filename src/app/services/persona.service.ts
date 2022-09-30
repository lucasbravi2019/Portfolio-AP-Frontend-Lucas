import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { PersonaRequest, PersonaResponse } from '../interfaces/persona';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  header: HttpHeaders
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  getPersona(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(Rutas.PERSONA)
  }

  editPersona(persona: PersonaRequest): Observable<PersonaRequest> {
    return this.http.put<PersonaResponse>(Rutas.PERSONA, persona, {
      headers: this.header
    })
  }
  
}
