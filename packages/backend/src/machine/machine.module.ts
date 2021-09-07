import { Module } from '@nestjs/common'
import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { UsersModule } from 'src/users/users.module'
import { ProductsModule } from 'src/products/products.module'

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
