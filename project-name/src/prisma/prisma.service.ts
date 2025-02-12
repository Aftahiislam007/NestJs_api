import {
    INestApplication,
    Injectable,
    OnModuleInit,
    OnModuleDestroy
} from '@nestjs/common';
import {
    PrismaClient
} from "@prisma/client/edge";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:123@localhost:5434/nest?schema=public'
                    // url: 'mysql://rahat:Admin@localhost:3306/nest'
                },
            },
            // engineType: 'library',
        });
    }



    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}