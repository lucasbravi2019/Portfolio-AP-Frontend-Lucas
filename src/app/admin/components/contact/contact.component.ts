import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactRequest, ContactResponse } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup
  isEditing: boolean = false
  isCreating: boolean = false
  message: string | null = null
  edited: boolean = false
  created: boolean = false
  deleted: boolean = false
  
  @Input() personaId?: number 
  @Input() contactList?: ContactResponse[]
  @Output() updatePersona = new EventEmitter<void>()

  constructor(private contactService: ContactService, private fb: FormBuilder, private loginService: LoginService) { 
    this.form = this.fb.group<ContactRequest>({
      id: 0,
      contactType: '',
      contactValue: '',
      personaId: 0
    })
  }

  ngOnInit(): void {
  }

  createContact() {
    this.form.reset()
    this.isEditing = false
    this.isCreating = true
    this.form.patchValue({
      personaId: this.personaId
    })
    this.scrollIntoView();
  }

  private scrollIntoView() {
    const element = document.getElementById('contactForm');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  editContact(contact: ContactResponse) {
    this.isCreating = false
    this.isEditing = true
    this.form.patchValue({
      id: contact.id,
      contactType: contact.contactType,
      contactValue: contact.contactValue,
      personaId: this.personaId
    })
    this.scrollIntoView()
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe({
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

  sendCreation() {
    this.contactService.createContact(this.form.value).subscribe({
      next: (data: ContactResponse) => {
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

  sendEdit() {
    this.contactService.editContact(this.form.value).subscribe({
      next: (data: ContactResponse) => {
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
        this.updatePersona.emit()
      }
    })
  }


}
