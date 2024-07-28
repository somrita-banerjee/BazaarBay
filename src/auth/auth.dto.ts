import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
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
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(60)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    phone_no: string;

    @IsNotEmpty()
    @IsEnum(USER_TYPE_ENUM)
    type: USER_TYPE_ENUM;
}
