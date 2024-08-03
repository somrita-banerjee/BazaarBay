import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { UserFromAuth } from 'src/decorator/userFromAuth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @UserFromAuth() user: any) {
        return this.orderService.create(createOrderDto, user);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@UserFromAuth() user: any) {
        return this.orderService.findAll(user);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @UserFromAuth() user: any) {
        return this.orderService.findOne(id, user);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @UserFromAuth() user: any) {
        return this.orderService.remove(id, user);
    }
}
