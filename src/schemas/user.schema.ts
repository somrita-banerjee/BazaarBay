import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum USER_TYPE_ENUM {
    SELLER = 'SELLER',
    BUYER = 'BUYER',
}

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true, maxlength: 20, minlength: 5 })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true, maxlength: 60 })
    email: string;

    @Prop({ required: true, maxlength: 12 })
    phone_no: string;

    @Prop({ required: true, type: USER_TYPE_ENUM, enum: USER_TYPE_ENUM })
    type: USER_TYPE_ENUM;
}

export const UserSchema = SchemaFactory.createForClass(User);
