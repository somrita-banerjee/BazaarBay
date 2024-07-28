import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        try {
            return await this.authService.register(body);
        } catch (error) {}
    }
}
