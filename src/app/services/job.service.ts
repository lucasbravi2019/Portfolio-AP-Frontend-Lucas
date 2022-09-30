import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { JobRequest, JobResponse } from '../interfaces/job';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  header: HttpHeaders
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  createJob(job: JobRequest): Observable<JobResponse> {
    return this.http.post<JobResponse>(Rutas.JOB, job, {
      headers: this.header
    })
  }

  editJob(job: JobRequest): Observable<JobResponse> {
    return this.http.put<JobResponse>(Rutas.JOB, job, { 
      headers: this.header
    })
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${Rutas.JOB}/${id}`, {
      headers: this.header
    })
  }

}
