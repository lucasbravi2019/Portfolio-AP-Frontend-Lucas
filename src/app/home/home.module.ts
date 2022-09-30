import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './home.component';
import { ProjectComponent } from './components/project/project.component';
import { JobComponent } from './components/job/job.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';

@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    ProjectComponent,
    JobComponent,
    TechnologyComponent,
    ContactComponent,
    AboutComponent,
    EducationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
