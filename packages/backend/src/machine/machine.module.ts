import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { UsersModule } from 'src/users/users.module'
import { ProductsModule } from 'src/products/products.module'
import { PriceModule } from 'src/price/price.module'

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PriceModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
