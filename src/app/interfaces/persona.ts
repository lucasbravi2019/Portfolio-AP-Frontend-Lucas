import { AboutResponse } from "./about"
import { ContactResponse } from "./contact"
import { EducationResponse } from "./education"
import { JobResponse } from "./job"
import { ProjectResponse } from "./project"
import { TechnologyResponse } from "./technology"

export interface PersonaRequest {
    id: number
    firstName: string
    lastName: string
}

export interface PersonaResponse {
    id: number
    firstName: string
    lastName: string
    about: AboutResponse
    technologyList: TechnologyResponse[]
    contactList: ContactResponse[]
    projectList: ProjectResponse[]
    jobList: JobResponse[]
    educationList: EducationResponse[]
}

export interface PersonaBasica {
    id: number
    firstName: string
    lastName: string
}