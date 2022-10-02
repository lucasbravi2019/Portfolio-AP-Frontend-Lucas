import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationRequest, EducationResponse } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  created: boolean = false
  edited: boolean = false
  deleted: boolean = false
  isCreating: boolean = false
  isEditing: boolean = false
  message: string | null = null
  form: FormGroup 

  @Input() educationList?: EducationResponse[]
  @Input() personaId?: number
  @Output() updatePersona = new EventEmitter()

  constructor(private educationService: EducationService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<EducationRequest>({
      id: 0,
      endDate: null,
      institute: '',
      isPresent: false,
      personaId: 0,
      startDate: new Date(),
      title: ''
    })
  }

  ngOnInit(): void {
    console.table(this.educationList)
  }

  disableEndDate() {
    if (this.form.value.isPresent) {
      this.form.controls['endDate'].disable()
    } else {
      this.form.controls['endDate'].enable()
    }
  }

  createEducation() {
    this.form.reset()
    this.isCreating = true
    this.form.patchValue({
      personaId: this.personaId
    })
  }

  editEducation(education: EducationResponse) {
    this.form.reset()
    this.isEditing = true
    this.form.patchValue({
      id: education.id,
      personaId: this.personaId,
      institute: education.institute,
      isPresent: education.endDate === 'Present',
      title: education.title
    })
    this.disableEndDate()
  }

  deleteEducation(id: number) {
    this.educationService.deleteEducation(id).subscribe({
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
    this.educationService.editEducation(this.form.value).subscribe({
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
    this.educationService.createEducation(this.form.value).subscribe({
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
