import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactRequest, ContactResponse } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

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

  @Input() contactList?: ContactResponse[]

  constructor(private contactService: ContactService, private fb: FormBuilder) { 
    this.form = this.fb.group<ContactRequest>({
      id: 0,
      contactType: '',
      contactValue: '',
      personaId: 0
    })
  }

  ngOnInit(): void {
    console.table(this.contactList)
  }

  editContact(contact: ContactResponse) {

  }

  deleteContact(id: number) {

  }

  sendEdit() {

  }

  sendCreation() {
    
  }

}
