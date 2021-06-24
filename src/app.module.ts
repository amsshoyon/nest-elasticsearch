import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { SearchModule } from './search/search.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
			useFactory: async () => ({
				type: 'mysql',
				host: process.env.DB_HOST,
				port: 3306,
				username: process.env.DB_USER_NAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
				entities: ['dist/**/*.entity{.ts,.js}'],
				synchronize: false,
				extra: {
					connectionLimit: 10
				}
			})
		}),
        SearchModule,
		ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
