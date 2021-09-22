import { ChangeCalculator } from './change-calculator'

describe('ChangeCalculator', () => {
  const changeCalculator = new ChangeCalculator([100, 50, 20, 10, 5])

  it('should throw if amount is negative value', () => {
    expect(() => changeCalculator.getChange(-20)).toThrow('Invalid amount')
  })

  it('should throw if amount is not divisible by 5 which is smallest denomination ', () => {
    expect(() => changeCalculator.getChange(53)).toThrow('Invalid amount')
    expect(() => changeCalculator.getChange(13)).toThrow('Invalid amount')
    expect(() => changeCalculator.getChange(27)).toThrow('Invalid amount')
  })

  it('should not return change if amount is zero value', () => {
    expect(changeCalculator.getChange(0)).toEqual({})
  })

  it('should return change', () => {
    expect(changeCalculator.getChange(20)).toEqual({ 20: 1 })
    expect(changeCalculator.getChange(55)).toEqual({ 50: 1, 5: 1 })
    expect(changeCalculator.getChange(70)).toEqual({ 50: 1, 20: 1 })
    expect(changeCalculator.getChange(100)).toEqual({ 100: 1 })
    expect(changeCalculator.getChange(125)).toEqual({ 100: 1, 20: 1, 5: 1 })
  })
})
