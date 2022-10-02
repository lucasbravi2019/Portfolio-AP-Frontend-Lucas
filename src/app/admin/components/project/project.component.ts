import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectRequest, ProjectResponse } from 'src/app/interfaces/project';
import { TechnologyResponse } from 'src/app/interfaces/technology';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  form: FormGroup
  isCreating: boolean = false
  isEditing: boolean = false
  created: boolean = false
  edited: boolean = false
  deleted: boolean = false
  message: string | null = null

  @Input() projectList?: ProjectResponse[]
  @Input() technologyList?: TechnologyResponse[]
  @Input() personaId?: number
  @Output() updatePersona = new EventEmitter<void>()
  
  constructor(private projectService: ProjectService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<ProjectRequest>({
      id: 0,
      projectName: '',
      projectDescription: '',
      site: '',
      technologyList: [], 
      personaId: 0,
      image: null
    })
  }

  ngOnInit(): void {
  }

  createProject() {
    console.log(this.isCreating)
    this.form.reset()
    this.isCreating = true
    this.isEditing = false
    console.log(this.isCreating)
    this.form.patchValue({
      personaId: this.personaId
    })
  }

  editProject(project: ProjectResponse) {
    this.form.reset()
    this.isCreating = false
    this.isEditing = true
    this.form.patchValue({
      id: project.id,
      personaId: this.personaId,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      technologyList: project.technologyList.map(technology => technology.id),
      site: project.site
    })
  }
  
  getTechnologies(technologyList: TechnologyResponse[]) {
    return technologyList.map(technology => technology.name).join(', ')
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe({
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
    formData.append('id', this.form.value.id)
    formData.append('personaId', this.form.value.personaId)
    formData.append('projectName', this.form.value.projectName)
    formData.append('projectDescription', this.form.value.projectDescription)
    formData.append('site', this.form.value.site)
    formData.append('technologyList', this.form.value.technologyList)
    formData.append('file', this.form.value.image)
    this.projectService.updateProject(formData).subscribe({
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
    formData.append('id', this.form.value.id)
    formData.append('personaId', this.form.value.personaId)
    formData.append('projectName', this.form.value.projectName)
    formData.append('projectDescription', this.form.value.projectDescription)
    formData.append('site', this.form.value.site)
    formData.append('technologyList', this.form.value.technologyList)
    formData.append('file', this.form.value.image)
    this.projectService.createProject(formData).subscribe({
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

  isIncluded(id: number) {
    if (this.technologies.value && this.technologies.value.includes(id)) {
      return {
        'background-color': 'green'
      }
    }
    return {
      'background-color': 'black'
    }
  }

  get technologies() {
    return this.form.controls['technologyList'] 
  }

  addTechnology(id: number) {
    let ids = this.technologies.value as number[]
    if (ids && ids.includes(id)) {
      ids = ids.filter(techId => techId != id)
    } else if (ids == null) {
      ids = [id]
    } else {
      ids.push(id)
    }
    this.technologies.patchValue(ids)
  }

  uploadFile(event: any) {
    this.form.patchValue({
      image: event.target.files[0]
    })
  }

  getImage(image: any) {
    return `data:image/jpeg;base64,${image}`
  }

}
