import { Component, OnInit, Input } from '@angular/core';
import { ProjectResponse } from 'src/app/interfaces/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() projectList?: ProjectResponse[]

  constructor() { }

  ngOnInit(): void {
    console.table(this.projectList)
  }

  getImage(image: any) {
    return 'data:image/jpeg;base64,' + image
  }

  getUrl(site: string) {
    if (!site.includes('http://') || !site.includes('https://')) {
      return `https://${site}`
    }
    return site
  }

}
