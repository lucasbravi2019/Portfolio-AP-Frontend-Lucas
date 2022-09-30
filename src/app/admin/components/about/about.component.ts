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
    console.table(this.about)
  }

}
