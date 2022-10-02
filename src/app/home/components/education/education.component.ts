import { Component, OnInit, Input } from '@angular/core';
import { EducationResponse } from 'src/app/interfaces/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educationList?: EducationResponse[]

  constructor() { }

  ngOnInit(): void {
  }
}
