import { TechnologyResponse } from "./technology"

export interface ProjectRequest {
    id: number
    projectName: string
    projectDescription: string
    site: string
    technologyList: number[]
    personaId: number
}

export interface ProjectResponse {
    id: number
    projectName: string
    projectDescription: string
    site: string
    technologyList: TechnologyResponse[]
    image: any
}