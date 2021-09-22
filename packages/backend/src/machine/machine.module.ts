import { Module } from '@nestjs/common'

import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { UsersModule } from '../users/users.module'
import { ProductsModule } from '../products/products.module'
import { CHANGE_CALCULATOR, DENOMINATIONS } from './machine.constants'
import { ChangeCalculator } from './change-calculator'

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [MachineController],
  providers: [
    MachineService,
    {
      provide: CHANGE_CALCULATOR,
      useValue: new ChangeCalculator([...DENOMINATIONS]),
    },
  ],
})
export class MachineModule {}
