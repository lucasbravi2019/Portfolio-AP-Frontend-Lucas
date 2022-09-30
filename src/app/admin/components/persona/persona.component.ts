import { Component, OnInit, Input } from '@angular/core';
import { PersonaBasica } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  @Input() persona?: PersonaBasica

  constructor() { }

  ngOnInit(): void {
    console.table(this.persona)
  }

}
