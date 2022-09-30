import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { ProjectRequest, ProjectResponse } from '../interfaces/project';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  header: HttpHeaders

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  createProject(project: ProjectRequest): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(Rutas.PROJECT, project, {
      headers: this.header
    })
  }

  updateProject(project: ProjectRequest): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(Rutas.PROJECT, project, {
      headers: this.header
    })
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${Rutas.PROJECT}/${id}`, {
      headers: this.header
    })
  }

}
