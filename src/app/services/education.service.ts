import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { EducationRequest, EducationResponse } from '../interfaces/education';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  header: HttpHeaders
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  createEducation(education: EducationRequest): Observable<EducationResponse> {
    return this.http.post<EducationResponse>(Rutas.EDUCATION, education, {
      headers: this.header
    });
  }

  editEducation(education: EducationRequest): Observable<EducationResponse> {
    return this.http.post<EducationResponse>(Rutas.EDUCATION, education, {  
      headers: this.header 
    })
  }

  deleteEducation(id: number): Observable<void> { 
    return this.http.delete<void>(`${Rutas.EDUCATION}/${id}`, {
      headers: this.header
    })
  }

}
