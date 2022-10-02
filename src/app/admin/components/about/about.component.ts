import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AboutRequest, AboutResponse } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isEditing: boolean = false
  form: FormGroup
  message: string | null = null
  edited: boolean = false

  @Input() about?: AboutResponse 
  @Input() personaId?: number
  @Output() updatePersona = new EventEmitter<void>()
 
  constructor(private aboutService: AboutService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<AboutRequest>({
      id: 0,
      aboutMsg: '',
      personaId: 0,
      image: null
    })
  }

  ngOnInit(): void {
  }

  getImage(image: any) {
    return `data:image/jpeg;base64,${image}`
  }

  uploadFile(event: any) {
    this.form.patchValue({
      image: event.target.files[0]
    })
  }

  editAbout() {
    this.isEditing = true
    this.form.patchValue({
      id: this.about?.id,
      aboutMsg: this.about?.aboutMsg,
      personaId: this.personaId,
    })
  }

  sendEdit() {
    let formData = new FormData()
    formData.append('file', this.form.value.image)
    formData.append('id', this.form.value.id)
    formData.append('aboutMsg', this.form.value.aboutMsg)
    formData.append('personaId', this.form.value.personaId)
    this.aboutService.editAbout(formData).subscribe({
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
