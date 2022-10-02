import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { TechnologyRequest, TechnologyResponse } from '../interfaces/technology';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  header: HttpHeaders

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  createTechnology(technology: FormData): Observable<TechnologyResponse> {
    return this.http.post<TechnologyResponse>(Rutas.TECHNOLOGY, technology, {
      headers: this.header
    })
  }

  updateTechnology(project: FormData): Observable<TechnologyResponse> {
    return this.http.put<TechnologyResponse>(Rutas.PROJECT, project, {
      headers: this.header
    })
  }

  deleteTechnology(id: number): Observable<void> {
    return this.http.delete<void>(`${Rutas.PROJECT}/${id}`, {
      headers: this.header
    })
  }

}
