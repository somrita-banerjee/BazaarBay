export interface LoginRequestBodyDTO {
    username: string;
    password: string;
}

export interface LoginResponseDTO {
    accessToken: string;
}

export enum USER_TYPE_ENUM {
    SELLER,
    BUYER,
}
export interface RegisterRequestBodyDTO {
    username: string;
    password: string;
    email: string;
    phone_no: number;
    type: USER_TYPE_ENUM;
}

export interface ProductDTO {
    imageUrl: string | undefined;
    description: string;
    _id: string;
    name: string;
    price: number;
    seller: {
        _id: string;
        username: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDTO {
    name: string;
    price: number;
}
export interface UpdateProductDTO {
    name: string;
    price: number;
}
