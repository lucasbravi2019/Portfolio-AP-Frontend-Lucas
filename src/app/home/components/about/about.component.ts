import { Component, OnInit, Input } from '@angular/core';
import { AboutResponse } from 'src/app/interfaces/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input() about?: AboutResponse

  constructor() { }

  ngOnInit(): void {
  }

  get imagen() {
    if (this.about && this.about.image) {
      return `data:image/jpeg;base64,${this.about.image}`
    } 
    return null
  }

}
