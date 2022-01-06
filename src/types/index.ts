export declare interface Material {
    id: string
    _id: string
    name: string
    brand: string
    model: string
    reference: string
    images: MaterialImageConnection
    category: MaterialCategory|null
    owner: User
    description: string
    createdAt: string|null
    updatedAt: string|null
}
export declare interface MaterialCategory {
    id: string
    _id: number|null
    name: string|null
    parent: MaterialCategory
}

//Connection for MaterialCategory.
export declare interface MaterialCategoryConnection {
    edges: [MaterialCategoryEdge]
    pageInfo: MaterialCategoryPageInfo|null
    totalCount: number|null
}

//Edge of MaterialCategory." +
export declare interface MaterialCategoryEdge {
    node: MaterialCategory
    cursor: string|null
}

//Information about the current page." +
export declare interface MaterialCategoryPageInfo {
    endCursor: string
    startCursor: string
    hasNextPage: boolean|null
    hasPreviousPage: boolean|null
}

//Connection for Material." +
export declare interface MaterialConnection {
    edges: [MaterialEdge]
    pageInfo: MaterialPageInfo|null
    totalCount: number|null
}

//Edge of Material." +
export declare interface MaterialEdge {
    node: Material
    cursor: string|null
}

export declare interface MaterialImage {
    id: string
    _id: string
    material: Material|null
    imageName: string|null
    imageSize: number|null
    createdAt: string|null
    updatedAt: string|null
}

//Connection for MaterialImage." +
export declare interface MaterialImageConnection {
    edges: [MaterialImageEdge]
    pageInfo: MaterialImagePageInfo|null
    totalCount: number|null
}

//Edge of MaterialImage." +
export declare interface MaterialImageEdge {
    node: MaterialImage
    cursor: string|null
}

//Information about the current page." +
export declare interface MaterialImagePageInfo {
    endCursor: string
    startCursor: string
    hasNextPage: boolean|null
    hasPreviousPage: boolean|null
}

//Information about the current page." +
export declare interface MaterialPageInfo {
    endCursor: string
    startCursor: string
    hasNextPage: boolean|null
    hasPreviousPage: boolean|null
}

export declare interface Mutation {
    //Deletes a Material." +
        deleteMaterial(input: deleteMaterialInput|null): deleteMaterialPayload

    //Updates a Material." +
        updateMaterial(input: updateMaterialInput|null): updateMaterialPayload

    //Creates a Material." +
        createMaterial(input: createMaterialInput|null): createMaterialPayload

    //Deletes a MaterialCategory." +
        deleteMaterialCategory(input: deleteMaterialCategoryInput|null): deleteMaterialCategoryPayload

    //Updates a MaterialCategory." +
        updateMaterialCategory(input: updateMaterialCategoryInput|null): updateMaterialCategoryPayload

    //Creates a MaterialCategory." +
        createMaterialCategory(input: createMaterialCategoryInput|null): createMaterialCategoryPayload

    //Deletes a MaterialImage." +
        deleteMaterialImage(input: deleteMaterialImageInput|null): deleteMaterialImagePayload

    //Updates a MaterialImage." +
        updateMaterialImage(input: updateMaterialImageInput|null): updateMaterialImagePayload

    //Creates a MaterialImage." +
        createMaterialImage(input: createMaterialImageInput|null): createMaterialImagePayload

    //Deletes a User." +
        deleteUser(input: deleteUserInput|null): deleteUserPayload

    //Updates a User." +
        updateUser(input: updateUserInput|null): updateUserPayload

    //Creates a User." +
        createUser(input: createUserInput|null): createUserPayload
}

//A node, according to the Relay specification." +
interface Node {
//    """The id of this node." +
    id: string
}

export declare interface User {
    id: string
    _id: string
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string|null
    roles: string[]
    password: string|null
    materials: Material[]
}

//Connection for User." +
export declare interface UserConnection {
    edges: [UserEdge]
    pageInfo: UserPageInfo|null
    totalCount: number|null
}

//Edge of User." +
export declare interface UserEdge {
    node: User
    cursor: string|null
}

//Information about the current page." +
export declare interface UserPageInfo {
    endCursor: string
    startCursor: string
    hasNextPage: boolean|null
    hasPreviousPage: boolean|null
}

export declare interface createMaterialCategoryInput {
    name: string|null
    parent: string
    children: [string]
    materials: [string]
    clientMutationId: string
}

export declare interface createMaterialCategoryPayload {
    materialCategory: MaterialCategory
    clientMutationId: string
}

export declare interface createMaterialImageInput {
    material: string|null
    imageFile: string
    imageName: string|null
    imageSize: number|null
    createdAt: string|null
    updatedAt: string|null
    clientMutationId: string
}

export declare interface createMaterialImagePayload {
    materialImage: MaterialImage
    clientMutationId: string
}

export declare interface createMaterialInput {
    name: string|null
    brand: string
    images: [string]
    reference: string
    model: string
    category: string|null
    owner: string
    description: string
    createdAt: string|null
    updatedAt: string|null
    clientMutationId: string
}

export declare interface createMaterialPayload {
    material: Material
    clientMutationId: string
}

export declare interface createUserInput {
    email: string|null
    roles: string[]
    password: string|null
    materials: [string]
    firstname: string
    lastname: string|null
    createdAt: string|null
    updatedAt: string|null
    clientMutationId: string
}

export declare interface createUserPayload {
    user: User
    clientMutationId: string
}

export declare interface deleteMaterialCategoryInput {
    id: string
    clientMutationId: string
}

export declare interface deleteMaterialCategoryPayload {
    materialCategory: MaterialCategory
    clientMutationId: string
}

export declare interface deleteMaterialImageInput {
    id: string
    clientMutationId: string
}

export declare interface deleteMaterialImagePayload {
    materialImage: MaterialImage
    clientMutationId: string
}

export declare interface deleteMaterialInput {
    id: string
    clientMutationId: string
}

export declare interface deleteMaterialPayload {
    material: Material
    clientMutationId: string
}

export declare interface deleteUserInput {
    id: string
    clientMutationId: string
}

export declare interface deleteUserPayload {
    user: User
    clientMutationId: string
}

export declare interface updateMaterialCategoryInput {
    id: string
    name: string
    parent: string
    children: [string]
    materials: [string]
    clientMutationId: string
}

export declare interface updateMaterialCategoryPayload {
    materialCategory: MaterialCategory
    clientMutationId: string
}

export declare interface updateMaterialImageInput {
    id: string
    material: string
    imageFile: string
    imageName: string|null
    imageSize: number
    createdAt: string
    updatedAt: string
    clientMutationId: string
}

export declare interface updateMaterialImagePayload {
    materialImage: MaterialImage
    clientMutationId: string
}

export declare interface updateMaterialInput {
    id: string
    name: string
    brand: string
    images: [string]
    reference: string
    model: string
    category: string
    owner: string
    description: string
    createdAt: string
    updatedAt: string
    clientMutationId: string
}

export declare interface updateMaterialPayload {
    material: Material
    clientMutationId: string
}

export declare interface updateUserInput {
    id: string
    email: string
    roles: string[]
    password: string
    materials: [string]
    firstname: string
    lastname: string
    createdAt: string
    updatedAt: string
    clientMutationId: string
}

export declare interface updateUserPayload {
    user: User
    clientMutationId: string
}
