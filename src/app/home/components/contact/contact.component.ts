import { Component, OnInit, Input } from '@angular/core';
import { ContactResponse } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contactList?: ContactResponse[]

  constructor() { }

  ngOnInit(): void {
    console.table(this.contactList)
  }
  
  isUrl(contact: string) {
    return contact.includes('www.') && contact.includes('.com')
  }
  
  isMail(contact: string) {
    return contact.includes('@gmail.com') || contact.includes('@hotmail.com') || contact.includes('@yahoo.com')
  }
  
  isTel(contact: string) {
    return !isNaN(parseInt(contact))
  }

  getUrl(contact: string) {
    if (!contact.includes('http://') && !contact.includes('https://')) {
      return `https://${contact}`;
    }
    return contact;
  }

  isGithub(contact: string) {
    return contact.includes('github') && contact.includes('.com')
  }

}
