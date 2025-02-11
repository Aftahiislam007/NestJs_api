import {
    Injectable
} from "@nestjs/common";

import {
    User,
    Bookmark
} from "@prisma/client";
import {
    PrismaService
} from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(authDto: AuthDto) {
        const hash = await argon.hash(authDto.password);
        const user = await this.prisma.user.create({
            data: {
                email: authDto.email,
                hash,
            },
        });
        
        return user;
    }

    signin() {
        return {
            msg: 'I have signed in'
        };
    }
}