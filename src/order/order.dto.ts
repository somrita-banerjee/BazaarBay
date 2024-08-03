import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';

class ItemDto {
    @IsNotEmpty()
    @IsString()
    product: string;

    @IsNotEmpty()
    @Min(1)
    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
}
