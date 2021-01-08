export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotoType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    userId: number
    lokkingForAJob: boolean
    lokkingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: Array<PhotoType>
}