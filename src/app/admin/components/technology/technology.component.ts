import { Component, OnInit, Input } from '@angular/core';
import { TechnologyResponse } from 'src/app/interfaces/technology';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  @Input() technologyList?: TechnologyResponse[]

  constructor() { }

  ngOnInit(): void {
    console.table(this.technologyList)
  }

}
