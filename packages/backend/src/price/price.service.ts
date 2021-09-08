import { Injectable } from '@nestjs/common'
import { COIN_DENOMINATIONS } from 'src/app.constants'

@Injectable()
export class PriceService {
  splitToCoins(amount: number): { coin: number; count: number }[] {
    const denominations = [...COIN_DENOMINATIONS]
    const result = []

    while (amount > 0) {
      if (!denominations.length) {
        result.push({ coin: 0, count: amount })
        break
      }

      const coin = denominations.pop()
      const count = Math.floor(amount / coin)

      amount -= count * coin

      if (count) {
        result.push({ coin, count })
      }
    }

    return result
  }

  validCoinPrice(amount: number) {
    return !this.splitToCoins(amount).some((el) => el.coin === 0)
  }
}
