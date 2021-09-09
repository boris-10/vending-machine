import { Module } from '@nestjs/common'
import { COIN_DENOMINATIONS, COIN_DENOMINATIONS_KEY } from 'src/price/price.constants'
import { PriceService } from './price.service'

@Module({
  providers: [
    PriceService,
    {
      provide: COIN_DENOMINATIONS_KEY,
      useValue: COIN_DENOMINATIONS,
    },
  ],
  exports: [PriceService],
})
export class PriceModule {}
