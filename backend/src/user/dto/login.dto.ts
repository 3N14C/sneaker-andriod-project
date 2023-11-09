export class LoginDto {
    id: string
    email: string
    password: string

    role: Role
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}