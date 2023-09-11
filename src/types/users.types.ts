export interface UserType {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    apartment: string;
    residence: string;
}

export interface UserTypeWithId extends UserType {
    id: number;
}