import { Test, TestingModule } from '@nestjs/testing'
import { COIN_DENOMINATIONS_KEY } from './price.constants'
import { PriceService } from './price.service'

describe('PriceService', () => {
  let service: PriceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceService,
        {
          provide: COIN_DENOMINATIONS_KEY,
          useValue: [5, 10, 20, 50, 100],
        },
      ],
    }).compile()

    service = module.get<PriceService>(PriceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should discard negative values', () => {
    expect(service.splitToCoins(-20)).toEqual([])
  })

  it('should give max denomination', () => {
    expect(service.splitToCoins(20)).toEqual([{ coin: 20, count: 1 }])
  })

  it('should split', () => {
    expect(service.splitToCoins(30)).toEqual([
      { coin: 20, count: 1 },
      { coin: 10, count: 1 },
    ])
  })

  it('should increase count', () => {
    expect(service.splitToCoins(40)).toEqual([{ coin: 20, count: 2 }])
  })

  it('should report change (that cannot be split) as 0 coin', () => {
    expect(service.splitToCoins(33)).toEqual([
      { coin: 20, count: 1 },
      { coin: 10, count: 1 },
      { coin: 0, count: 3 },
    ])
  })

  it('should be valid price', () => {
    expect(service.validCoinPrice(40)).toEqual(true)
  })

  it('should be invalid price', () => {
    expect(service.validCoinPrice(42)).toEqual(false)
  })
})
