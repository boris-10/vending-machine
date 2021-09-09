import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { UsersModule } from '../users/users.module'
import { ProductsModule } from '../products/products.module'
import { PriceModule } from '../price/price.module'

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PriceModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
