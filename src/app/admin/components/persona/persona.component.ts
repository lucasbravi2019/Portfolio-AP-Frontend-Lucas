import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaBasica, PersonaRequest, PersonaResponse } from 'src/app/interfaces/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  isEditing: boolean = false
  form: FormGroup
  message: string | null = null
  edited: boolean = false

  @Input() persona?: PersonaBasica 
  @Output() updatePersona = new EventEmitter<void>()
 
  constructor(private personaService: PersonaService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<PersonaRequest>({
      firstName: this.persona?.firstName || '',
      lastName: this.persona?.lastName || '',
      id: this.persona?.id || 0
    })
  }

  ngOnInit(): void {
  }

  editPersona() {
    this.isEditing = true
    this.form.patchValue({
      firstName: this.persona?.firstName || '',
      lastName: this.persona?.lastName || '',
      id: this.persona?.id || 0
    })
    this.scrollIntoView();
  }

  private scrollIntoView() {
    const element = document.getElementById('personaForm');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  sendEdit() {
    this.personaService.editPersona(this.form.value).subscribe({
      next: (data: PersonaResponse) => {
        this.edited = true
        setTimeout(() => {
          this.edited = false
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.loginService.deslogear()
        }
        this.message = 'Edition failed. Please try again later.'
        this.isEditing = false
        setTimeout(() => {
          this.message = null
        }, 3000);
      },
      complete: () => {
        this.isEditing = false
        this.updatePersona.emit();
      }
    })
  }

}
