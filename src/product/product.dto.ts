import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description: string;
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    name: string;

    @IsOptional()
    @IsNumber()
    @MinLength(1)
    price: number;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description: string;
}
