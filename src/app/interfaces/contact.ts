export interface ContactRequest {
    id: number
    contactType: string
    contactValue: string
    personaId: number
}

export interface ContactResponse {
    id: number
    contactType: string
    contactValue: string
}