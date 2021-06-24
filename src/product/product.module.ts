import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    exports: [TypeOrmModule],
    providers: [ProductService],
    controllers: [ProductController]
})

export class ProductModule {}