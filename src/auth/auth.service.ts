import { Injectable, Logger } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    login(body: LoginDto) {}

    register(body: RegisterDto) {
        this.logger.log(body);
    }
}
