import { Component, OnInit, Input } from '@angular/core';
import { JobResponse } from 'src/app/interfaces/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() jobList?: JobResponse[]

  constructor() { }

  ngOnInit(): void {
    console.table(this.jobList)
  }

}
