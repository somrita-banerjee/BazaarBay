import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';
import { Model } from 'mongoose';
import { User, USER_TYPE_ENUM } from 'src/schemas/user.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async create(createProductDto: CreateProductDto, user: any) {
        if (user.type !== USER_TYPE_ENUM.SELLER) {
            throw new ForbiddenException('Only seller can create Product');
        }
        try {
            const newProduct = new this.productModel(createProductDto);
            const seller = await this.userModel.findById(user.id);

            newProduct.seller = seller;
            return newProduct.save();
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
        let searchQuery = {};

        if (user.type === USER_TYPE_ENUM.SELLER) {
            try {
                const seller = await this.userModel.findById(user.id);
                if (!seller) {
                    throw new ForbiddenException('Seller not found');
                }
                searchQuery = {
                    seller,
                };
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

        try {
            const products = await this.productModel.find(searchQuery);
            return products;
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

    findOne(id: number, user: any) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto, user: any) {
        return `This action updates a #${id} product`;
    }

    remove(id: number, user: any) {
        return `This action removes a #${id} product`;
    }
}
