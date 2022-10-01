import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaBasica, PersonaRequest, PersonaResponse } from 'src/app/interfaces/persona';
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
 
  constructor(private personaService: PersonaService, private fb: FormBuilder) { 
    this.form = this.fb.group<PersonaRequest>({
      firstName: this.persona?.firstName || '',
      lastName: this.persona?.lastName || '',
      id: this.persona?.id || 0
    })
  }

  ngOnInit(): void {
    console.table(this.persona)
  }

  editPersona() {
    this.isEditing = true
    this.form.patchValue({
      firstName: this.persona?.firstName || '',
      lastName: this.persona?.lastName || '',
      id: this.persona?.id || 0
    })
  }

  sendEdit() {
    this.personaService.editPersona(this.form.value).subscribe({
      next: (data: PersonaResponse) => {
        this.edited = true
        setTimeout(() => {
          this.edited = false
        }, 3000);
        this.persona = {...data}
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.message
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
