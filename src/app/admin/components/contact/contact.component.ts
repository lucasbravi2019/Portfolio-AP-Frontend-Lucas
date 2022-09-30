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

}
