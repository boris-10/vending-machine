import { ChangeCalculatorBase } from './change-calculator-base'

export class ChangeCalculator extends ChangeCalculatorBase {
  constructor(denominations: number[]) {
    super(denominations)
  }

  getChange(amount: number) {
    const change: Record<number, number> = {}

    if (amount < 0 || amount % 5 !== 0) {
      throw new Error('Invalid amount')
    }

    for (const coin of this.denominations) {
      if (amount < coin) continue

      const count = Math.floor(amount / coin)
      if (count > 0) {
        change[coin] = count
      }

      amount = amount % coin
      if (amount === 0) break
    }

    return change
  }
}
