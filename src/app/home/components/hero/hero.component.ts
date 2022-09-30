import { Component, OnInit, Input } from '@angular/core';
import { AboutResponse } from 'src/app/interfaces/about';
import { PersonaBasica, PersonaResponse } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() persona?: PersonaBasica
  @Input() about?: AboutResponse

  constructor() { }

  ngOnInit(): void {
    console.table(this.persona);
  }

  get name(): string {
    return `${this.persona?.firstName} ${this.persona?.lastName}`;
  }

  get title(): string {
    return `${this.about?.aboutMsg}`;
  }

}
