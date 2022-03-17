export declare interface Material {
    id: string
    _id: string
    name: string
    brand: string
    model: string
    reference: string
    images: MaterialImageConnection
    category: MaterialCategory | null
    owner: User
    description: string
    pricings: PricingConnection
    bookings: MaterialBookingConnection
    createdAt: string | null
    updatedAt: string | null
}
export declare interface MaterialCategory {
    id: string
    _id: number | null
    name: string | null
    parent: MaterialCategory
}

//Connection for MaterialCategory.
export declare interface MaterialCategoryConnection {
    edges: [MaterialCategoryEdge]
    pageInfo: PageInfo | null
    totalCount: number | null
}
export declare interface MaterialCollection {
    collection: [MaterialEdge]
    paginationInfo: PaginationInfo
}
export declare interface PricingConnection {
    collection: [Pricing]
    paginationInfo: PaginationInfo
}
export declare interface RatingConnection {
    edges: [RatingEdge]
    pageInfo: PageInfo | null
    totalCount: number
}
export declare interface RatingEdge {
    node: Rating
    cursor: string | null
}

//Edge of MaterialCategory." +
export declare interface MaterialEdge {
    node: Material
}
export declare interface MaterialCategoryEdge {
    node: MaterialCategory
    cursor: string | null
}

//Information about the current page." +
export declare interface PageInfo {
    endCursor: string
    startCursor: string
    hasNextPage: boolean | null
    hasPreviousPage: boolean | null
}

export declare interface PaginationInfo {
    itemsPerPage: number
    lastPage: number
    totalCount: number
}

export declare interface MaterialImage {
    id: string
    _id: string
    material: Material | null
    imageName: string | null
    imageSize: number | null
    createdAt: string | null
    updatedAt: string | null
}

//Connection for MaterialImage." +
export declare interface MaterialImageConnection {
    edges: [MaterialImageEdge]
    pageInfo: PageInfo | null
    totalCount: number | null
}

//Edge of MaterialImage." +
export declare interface MaterialImageEdge {
    node: MaterialImage
    cursor: string | null
}

//Information about the current page." +

//Information about the current page." +

export declare interface Pricing {
    id: string
    _id: string
    value: number
    period: 0.5 | 1 | 2 | 7 | 31
    circles: CircleConnection
}

export declare interface PricingEdge {
    node: Pricing
    cursor: string | null
}

export declare interface MaterialBookingConnection {
    edges: [MaterialBookingEdge]
}
export declare interface MaterialBookingEdge {
    node: MaterialBooking
    cursor: string | null
}
export declare interface MaterialBooking {
    id: string
    _id: string
    material: Material
    user: User
    startDate: string | null
    endDate: string | null
    createdAt: string | null
    updatedAt: string | null
    price: number | null
    status: 'estimated' | 'validated' | 'canceled' | 'confirmed' | 'closed'
    periods: [MaterialBookingDatePeriod]
}
export declare interface MaterialBookingDatePeriod {
    id: string
    _id: string
    booking: MaterialBooking
    startDate: string | null
    endDate: string | null
    price: number
}
export declare interface User {
    id: string
    _id: string
    firstname: string
    lastname: string
    phoneNumber: string
    email: string | null
    roles: string[]
    password: string | null
    materials: MaterialCollection
    createdAt: string | null
    updatedAt: string | null
    avatarUrl: string
    avatarName: string | null
    avatarSize: number | null
    city: string | null
    circles: CircleConnection
    ratings: RatingConnection
    averageRatingScore: number | null
    gender: 'male' | 'female' | null
}

//Connection for User." +
export declare interface UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo | null
    totalCount: number | null
}

//Edge of User." +
export declare interface UserEdge {
    node: User
    cursor: string | null
}

//Information about the current page." +

export declare interface Circle {
    id: string
    _id: string
    name: string
    description: string | null
    city: string | null
    parent: Circle | null
    children: [Circle]
    members: UserConnection
    logoName: string
    logoSize: number
}
export declare interface CircleConnection {
    edges: [CircleEdge]
    pageInfo: PageInfo | null
    totalCount: number | null
}

//Edge of Circle." +
export declare interface CircleEdge {
    node: Circle
    cursor: string | null
}

//Information about the current page." +

export declare interface Rating {
    id: string
    _id: string
    value: number
    booking: MaterialBooking
    author: User
    user: User
    createdAt: string | null
    updatedAt: string | null
}
