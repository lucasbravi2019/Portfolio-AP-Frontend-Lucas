export interface EducationRequest {
    id: number
    institute: string
    title: string
    startDate: Date
    endDate: Date | null
    isPresent: boolean | null
    personaId: number
}

export interface EducationResponse {
    id: number
    institute: string
    title: string
    startDate: string
    endDate: string
}
