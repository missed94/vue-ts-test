export interface UserCompany {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface UserAddressGeo {
    lat: string,
    lng: string
}

export interface UserAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: UserAddressGeo
}

export interface User {
    id: number,
    name: string,
    username: string,
    email?: string,
    address?: UserAddress,
    phone?: string,
    website?: string,
    company?: UserCompany,
    thumbnailUrl?: string
}

export interface Album {
    albumId?: number,
    id: number,
    title?: string,
    url?: string,
    thumbnailUrl: string
}

export type Users = Array<User>
export type Albums = Array<Album>

export interface UsersState {
    users: Users,
    usersIsPending: boolean,
    albums: Albums,
    albumsIsPending: boolean,
}

export interface RootState {
    users: UsersState
}