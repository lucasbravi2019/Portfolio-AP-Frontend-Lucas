export interface JobRequest { 
    id: number
    companyName: string
    jobRole: string
    jobTitle: string
    startDate: Date
    endDate: Date | null
    isPresent: boolean | null
    personaId: number
}

export interface JobResponse {
    id: number
    companyName: string
    jobRole: string
    jobTitle: string
    startDate: string
    endDate: string
}