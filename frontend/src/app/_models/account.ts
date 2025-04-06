export interface Account {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    token?: string;
    jwtToken?: string;
    refreshToken?: string;
    isVerified: boolean;
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}
