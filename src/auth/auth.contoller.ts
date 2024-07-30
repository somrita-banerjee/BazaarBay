import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginDto) {
        return await this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return await this.authService.register(body);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getMe(@Request() req: any) {
        return await this.authService.getMe(req.user.sub);
    }
}
