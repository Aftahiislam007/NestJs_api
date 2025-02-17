import {
    INestApplication,
    Injectable,
    OnModuleInit,
    OnModuleDestroy
} from '@nestjs/common';
import {
    PrismaClient
} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                    // url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
                    // url: 'mysql://rahat:Admin@localhost:3306/nest'
                },
            },
            // engine: {
            //     type: 'library', // Ensure it's set to 'library'
            // },
            // engineType: 'library',
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        (this as any).$on('beforeExit', async () => {
            await app.close();
        });
    }
}