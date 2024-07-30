import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async login(body: LoginDto) {
        const findUser = await this.userModel.findOne({
            username: body.username,
        });
        if (!findUser) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordSame = await bcrypt.compare(
            body.password,
            findUser.password,
        );

        if (!isPasswordSame) {
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = {
            sub: findUser.id,
            username: findUser.username,
            email: findUser.email,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<number>(
                'SECURITY.JWT_EXPIRES_IN',
            ),
            secret: this.configService.get<string>('SECURITY.JWT_SECRET'),
        });

        return {
            accessToken,
        };
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
