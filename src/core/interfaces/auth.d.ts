export interface AuthResult {
    result: Result;
    token: string;
}

export interface Result {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: number;
    updatedAt: string;
    createdAt: string;
    __v: number;
}

export interface AuthData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    image?: string;
}
