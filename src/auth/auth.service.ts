import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email-service';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
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

        try {
            await this.emailService.sendWelcomeMail(body.email, body.username);
        } catch (error) {
            this.logger.error(error);
        }

        try {
            body.password = hash;
            const newUser = new this.userModel(body);
            return newUser.save();
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

    async getMe(userId: string) {
        const user = await this.userModel.findOne({
            _id: userId,
        });

        return user;
    }
}
