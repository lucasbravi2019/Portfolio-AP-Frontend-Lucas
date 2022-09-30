import { Component, OnInit } from '@angular/core';
import { PersonaBasica, PersonaResponse } from '../interfaces/persona';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private _persona: PersonaResponse | undefined
  private _loading: boolean = true
  
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona()
  }

  getPersona() {
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this._persona = data
        this.toggleLoading()
      }
    })
  }

  toggleLoading() {
    this._loading = !this._loading
  }

  get persona(): PersonaResponse | null {
    return this._persona || null
  }

  get loading(): boolean {
    return this._loading
  }

  get personaBasica(): PersonaBasica | undefined{
    if (!this._persona) return undefined
    return {
      id: this._persona.id ,
      firstName: this._persona.firstName,
      lastName: this._persona.lastName,
    } 
  }

}
