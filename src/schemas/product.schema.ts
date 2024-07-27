import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({
    timestamps: true,
})
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, min: 1 })
    price: number;

    @Prop({ maxlength: 200 })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    seller: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
