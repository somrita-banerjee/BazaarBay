import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, USER_TYPE_ENUM } from 'src/schemas/user.schema';
import { Order } from 'src/schemas/order.schema';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
    ) {}
    async create(createOrderDto: CreateOrderDto, user: any) {
        if (user.type !== USER_TYPE_ENUM.BUYER) {
            throw new ForbiddenException('Only buyer can create order');
        }

        let totalPrice = 0;

        for (const item of createOrderDto.items) {
            const { product, quantity } = item;

            const productDetails = await this.productModel.findById(product);

            totalPrice += productDetails.price * quantity;
        }

        try {
            const newOrder = new this.orderModel(createOrderDto);

            const buyer = await this.userModel.findById(user.id);
            newOrder.buyer = buyer;

            newOrder.price = totalPrice;

            return newOrder.save();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: error,
                },
            );
        }
    }

    async findAll(user: any) {
        return `This action returns all order`;
    }

    async findOne(id: string, user: any) {
        return `This action returns a #${id} order`;
    }

    async remove(id: string, user: any) {
        return `This action removes a #${id} order`;
    }
}
