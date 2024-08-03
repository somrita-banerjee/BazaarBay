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
        if (user.type !== USER_TYPE_ENUM.BUYER) {
            throw new ForbiddenException('Only buyer can find its order');
        }
        try {
            const buyer = await this.userModel.findById(user.id);

            if (!buyer) {
                throw new ForbiddenException('Buyer not found');
            }

            const orders = await this.orderModel
                .find({
                    buyer,
                })
                .populate({
                    path: 'items',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        select: 'name',
                    },
                })
                .exec();

            return orders;
        } catch (error) {
            console.log(error);
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

    async findOne(id: string, user: any) {
        if (user.type !== USER_TYPE_ENUM.BUYER) {
            throw new ForbiddenException('Only buyer can find its order');
        }
        try {
            const buyer = await this.userModel.findById(user.id);

            if (!buyer) {
                throw new ForbiddenException('Buyer not found');
            }

            const order = await this.orderModel
                .findOne({
                    _id: id,
                    buyer,
                })
                .populate({
                    path: 'items',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        select: 'name',
                    },
                })
                .exec();

            return order;
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

    async remove(id: string, user: any) {
        return `This action removes a #${id} order`;
    }
}
