import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobRequest, JobResponse } from 'src/app/interfaces/job';
import { JobService } from 'src/app/services/job.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  form: FormGroup
  isCreating: boolean = false
  isEditing: boolean = false
  created: boolean = false
  edited: boolean = false
  deleted: boolean = false
  message: string | null = null

  @Input() jobList?: JobResponse[]
  @Input() personaId?: number
  @Output() updatePersona = new EventEmitter<void>()
  
  constructor(private jobService: JobService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<JobRequest>({
      id: 0,
      companyName: '',
      endDate: null,
      isPresent: false,
      jobRole: '',
      jobTitle: '',
      personaId: 0,
      startDate: new Date()
    })
  }

  ngOnInit(): void {
  }

  disableEndDate() {
    if (this.form.value.isPresent) {
      this.form.controls['endDate'].disable()
    } else {
      this.form.controls['endDate'].enable()
    }
  }

  createJob() {
    this.form.reset()
    this.isEditing = false
    this.isCreating = true
    this.form.patchValue({
      personaId: this.personaId
    })
  }

  editJob(job: JobResponse) {
    this.form.reset()
    this.isCreating = false
    this.isEditing = true
    this.form.patchValue({
      id: job.id,
      personaId: this.personaId,
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      jobRole: job.jobRole,
      startDate: job.startDate,
      endDate: job.endDate,
      isPresent: job.endDate === '9999-09-09'
    })
    this.disableEndDate()
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe({
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
        this.message = 'Deletion failed. Please try again later.'
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
    this.jobService.editJob(this.form.value).subscribe({
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
        this.message = 'Edition failed. Please try again later.'
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
    this.jobService.createJob(this.form.value).subscribe({
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
        this.message = 'Creation failed. Please try again later.'
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
