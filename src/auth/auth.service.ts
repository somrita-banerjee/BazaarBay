import { Injectable, Logger } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService,
    ) {}

    login(body: LoginDto) {}

    async register(body: RegisterDto) {
        const saltOrRounds = this.configService.get<number>(
            'SECURITY.SALT_ROUNDS',
        );
        const hash = await bcrypt.hash(body.password, saltOrRounds);
        body.password = hash;
        const newUser = new this.userModel(body);
        return newUser.save();
    }
}
