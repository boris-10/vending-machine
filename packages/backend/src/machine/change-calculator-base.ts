export abstract class ChangeCalculatorBase {
  protected denominations: number[]

  constructor(denominations: number[]) {
    denominations.sort((a, b) => b - a)
    this.denominations = denominations
  }

  abstract getChange(amount: number): Record<number, number> | never
}
