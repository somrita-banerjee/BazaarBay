import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserFromAuth } from 'src/decorator/userFromAuth.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() createProductDto: CreateProductDto,
        @UserFromAuth() user: any,
    ) {
        return this.productService.create(createProductDto, user);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@UserFromAuth() user: any) {
        return this.productService.findAll(user);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @UserFromAuth() user: any) {
        return await this.productService.findOne(id, user);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UserFromAuth() user: any,
    ) {
        return this.productService.update(+id, updateProductDto, user);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @UserFromAuth() user: any) {
        return this.productService.remove(id, user);
    }
}
