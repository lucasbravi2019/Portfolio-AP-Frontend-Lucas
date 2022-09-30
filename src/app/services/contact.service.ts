import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutas } from '../enum/rutas';
import { ContactRequest, ContactResponse } from '../interfaces/contact';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  header: HttpHeaders
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.header = loginService.header
  }

  createContact(contact: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(Rutas.CONTACT, contact, {
      headers: this.header
    })
  }

  editContact(contact: ContactRequest): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(Rutas.CONTACT, contact, {
      headers: this.header
    })
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<void>(`${Rutas.CONTACT}/${id}`, {
      headers: this.header
    })
  }

}
