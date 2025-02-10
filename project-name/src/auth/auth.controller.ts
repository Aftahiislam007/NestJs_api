import {
    Body,
    Controller,
    ParseIntPipe,
    Post,
    Req
} from "@nestjs/common";
import {
    Request
} from 'express';
import {
    AuthService
} from "./auth.service";
import {
    AuthDto
} from "./dto";

@Controller('auth')
export class AuthContoller {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() authDto: AuthDto) {
        return this.authService.signup(authDto);
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }
}