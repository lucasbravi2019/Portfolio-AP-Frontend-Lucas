import { FormArray } from "@angular/forms"
import { TechnologyResponse } from "./technology"

export interface ProjectRequest {
    id: number
    projectName: string
    projectDescription: string
    site: string
    technologyList: number[]
    personaId: number
    image: any
}

export interface ProjectResponse {
    id: number
    projectName: string
    projectDescription: string
    site: string
    technologyList: TechnologyResponse[]
    image: any
}