import { Component, OnInit } from '@angular/core';
import { AboutResponse } from '../interfaces/about';
import { ContactResponse } from '../interfaces/contact';
import { EducationResponse } from '../interfaces/education';
import { JobResponse } from '../interfaces/job';
import { PersonaBasica, PersonaResponse } from '../interfaces/persona';
import { ProjectResponse } from '../interfaces/project';
import { TechnologyResponse } from '../interfaces/technology';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private _persona?: PersonaResponse

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona()
  }

  getPersona() {
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this._persona = data
        console.table(this._persona)
      }
    })
  }

  reload() {
    this.getPersona()
  }

  get persona(): PersonaResponse | undefined {
    return this._persona
  }

  get personaBasica(): PersonaBasica | undefined {
    if (!this._persona) return undefined
    return {
      id: this._persona.id,
      firstName: this._persona.firstName,
      lastName: this._persona.lastName
    }
  }

  get technologyList(): TechnologyResponse[] | undefined {
    return this._persona?.technologyList
  }

  get contactList(): ContactResponse[] | undefined {
    return this._persona?.contactList
  }

  get about(): AboutResponse | undefined {
    return this._persona?.about
  }

  get projectList(): ProjectResponse[] | undefined {
    return this._persona?.projectList
  }

  get jobList(): JobResponse[] | undefined {
    return this._persona?.jobList
  }

  get educationList(): EducationResponse[] | undefined {
    return this._persona?.educationList
  }

}
