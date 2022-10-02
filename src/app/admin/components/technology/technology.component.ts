import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TechnologyRequest, TechnologyResponse } from 'src/app/interfaces/technology';
import { LoginService } from 'src/app/services/login.service';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  form: FormGroup
  isCreating: boolean = false
  isEditing: boolean = false
  created: boolean = false
  edited: boolean = false
  deleted: boolean = false
  message: string | null = null

  @Input() technologyList?: TechnologyResponse[]
  @Input() personaId?: number
  @Output() updatePersona = new EventEmitter<void>()
  
  constructor(private technologyService: TechnologyService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<TechnologyRequest>({
      id: 0,
      name: '',
      level: 0,
      personaId: 0,
      image: null
    })
  }

  ngOnInit(): void {
    console.table(this.technologyList)
  }

  getImage(image: any) {
    if (image == null) {
      return null
    }
    return `data:image/jpeg;base64,${image}` 
  }

  uploadFile(event: any) {
    this.form.patchValue({
      image: event.target.files[0]
    })
  }

  createTechnology() {
    this.form.reset()
    this.isEditing = false
    this.isCreating = true
    this.form.patchValue({
      personaId: this.personaId
    })
  }

  editTechnology(technology: TechnologyResponse) {
    this.isCreating = false
    this.isEditing = true
    this.form.reset()
    this.form.patchValue({
      id: technology.id,
      personaId: this.personaId,
      name: technology.name,
      level: technology.level
    })
  }

  deleteTechnology(id: number) {
    this.technologyService.deleteTechnology(id).subscribe({
      next: () => {
        this.deleted = true
        setTimeout(() => {
          this.deleted = false
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.loginService.deslogear()
        }
        this.message = error.message
        setTimeout(() => {
          this.message = null 
        }, 3000);
      },
      complete: () => {
        this.updatePersona.emit()
      } 
    })
  }

  sendEdit() {
    let formData = new FormData()
    formData.append('file', this.form.value.image)
    formData.append('id', this.form.value.id)
    formData.append('name', this.form.value.name)
    formData.append('level', this.form.value.level)
    formData.append('personaId', this.form.value.personaId)
    this.technologyService.updateTechnology(formData).subscribe({
      next: () => {
        this.edited = true
        setTimeout(() => {
          this.edited = false
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.loginService.deslogear()
        }
        this.message = error.message
        setTimeout(() => {
          this.message = null
        }, 3000);
      },
      complete: () => {
        this.isEditing = false
        this.updatePersona.emit()
      }
    })
  }

  sendCreation() {
    let formData = new FormData()
    formData.append('file', this.form.value.image)
    formData.append('id', this.form.value.id)
    formData.append('name', this.form.value.name)
    formData.append('level', this.form.value.level)
    formData.append('personaId', this.form.value.personaId)
    this.technologyService.createTechnology(formData).subscribe({
      next: () => {
        this.created = true
        setTimeout(() => {
          this.created = false
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.loginService.deslogear()
        }
        this.message = error.message
        this.isCreating = false
        setTimeout(() => {
          this.message = null
        }, 3000);
      },
      complete: () => {
        this.isCreating = false
        this.updatePersona.emit()
      }
    })
  }

}
