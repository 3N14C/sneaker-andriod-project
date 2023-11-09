import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1, { message: 'Password must be at least 5 characters' })
    password: string;

    role: Role
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}