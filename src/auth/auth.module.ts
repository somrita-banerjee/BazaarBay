import { Module } from '@nestjs/common';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { EmailServiceModule } from 'src/email-service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
        }),
        EmailServiceModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
