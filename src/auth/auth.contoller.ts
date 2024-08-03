import {
    BadRequestException,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserFromAuth } from 'src/decorator/userFromAuth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Login credentials' })
    @Post('login')
    async login(@Body() body: LoginDto) {
        return await this.authService.login(body);
    }

    @ApiOperation({ summary: 'Registration for user' })
    @Post('register')
    async register(@Body() body: RegisterDto) {
        try {
            return await this.authService.register(body);
        } catch (error) {
            throw new BadRequestException('Email already present');
        }
    }

    @ApiOperation({ summary: 'Get my details' })
    @UseGuards(AuthGuard)
    @Get('me')
    async getMe(@UserFromAuth() user: any) {
        return await this.authService.getMe(user.sub);
    }
}
