export interface AboutRequest {
    id: number
    aboutMsg: string
    personaId: number
}

export interface AboutResponse {
    id: number
    aboutMsg: string
    image: any
}