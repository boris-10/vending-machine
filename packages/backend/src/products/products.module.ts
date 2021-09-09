import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { PriceModule } from '../price/price.module'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'

@Module({
  imports: [PrismaModule, PriceModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
