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
            const products = await this.productModel
                .find(searchQuery)
                .populate({
                    path: 'seller',
                    select: 'username',
                })
                .exec();
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

    async findOne(id: string, user: any) {
        let searchQuery: any = { _id: id };

        if (user.type === USER_TYPE_ENUM.SELLER) {
            try {
                const seller = await this.userModel.findById(user.id);
                if (!seller) {
                    throw new ForbiddenException('Seller not found');
                }
                searchQuery = {
                    ...searchQuery,
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
            const product = await this.productModel
                .findOne(searchQuery)
                .populate({
                    path: 'seller',
                    select: 'username',
                })
                .exec();
            return product;
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

    async update(id: string, updateProductDto: UpdateProductDto, user: any) {
        console.log(user);
        if (user.type !== USER_TYPE_ENUM.SELLER) {
            throw new ForbiddenException('Only seller can update Product');
        }
        try {
            const seller = await this.userModel.findById(user.id);
            if (!seller) {
                throw new ForbiddenException('Seller not found');
            }

            return this.productModel.updateOne(
                {
                    _id: id,
                    seller,
                },
                updateProductDto,

                {
                    new: true,
                },
            );
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
        if (user.type !== USER_TYPE_ENUM.SELLER) {
            throw new ForbiddenException('Only seller can delete');
        }
        try {
            const seller = await this.userModel.findById(user.id);
            if (!seller) {
                throw new ForbiddenException('Seller not found');
            }

            return await this.productModel.deleteOne({
                _id: id,
                seller,
            });
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
}
