import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_TYPE_ENUM } from 'src/schemas/user.schema';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone_no: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPE_ENUM)
    type: USER_TYPE_ENUM;
}
