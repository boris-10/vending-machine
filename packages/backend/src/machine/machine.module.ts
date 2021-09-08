import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { UsersModule } from 'src/users/users.module'
import { ProductsModule } from 'src/products/products.module'

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
