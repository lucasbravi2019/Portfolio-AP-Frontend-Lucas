import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { PersonaComponent } from './components/persona/persona.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { JobComponent } from './components/job/job.component';
import { ProjectComponent } from './components/project/project.component';
import { TechnologyComponent } from './components/technology/technology.component';



@NgModule({
  declarations: [
    AdminComponent,
    PersonaComponent,
    AboutComponent,
    ContactComponent,
    EducationComponent,
    JobComponent,
    ProjectComponent,
    TechnologyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
