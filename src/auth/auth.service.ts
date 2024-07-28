import { Injectable, Logger } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    login(body: LoginDto) {}

    register(body: RegisterDto) {
        const newUser = new this.userModel(body);
        return newUser.save();
    }
}
