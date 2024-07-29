import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

    async login(body: LoginDto) {
        const findUser = await this.userModel.findOne({
            username: body.username,
        });
        if (!findUser) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordSame = await bcrypt.compare(
            body.password,
            findUser.password,
        );

        if (!isPasswordSame) {
            throw new HttpException(
                'Password is incorrect',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return findUser;
    }

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
