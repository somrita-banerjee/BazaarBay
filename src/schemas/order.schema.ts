import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';
import mongoose from 'mongoose';

class Item {
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    })
    product: Product;

    @Prop({ required: true, min: 1 })
    quantity: number;
}

@Schema({
    timestamps: true,
})
export class Order {
    @Prop({ required: true, type: [Item] })
    items: Item[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    buyer: User;

    @Prop({ required: true, min: 1 })
    price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
