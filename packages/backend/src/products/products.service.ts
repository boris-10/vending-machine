import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PriceService } from 'src/price/price.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService, private readonly priceService: PriceService) {}

  create(createProductDto: CreateProductDto) {
    if (!this.priceService.validCoinPrice(createProductDto.cost)) {
      throw new BadRequestException('Product price has to be valid sum of coins')
    }

    return this.prisma.product.create({
      data: {
        cost: createProductDto.cost,
        sellerId: createProductDto.sellerId,
        productName: createProductDto.productName,
        amountAvailable: createProductDto.amountAvailable,
      },
    })
  }

  findAll() {
    return this.prisma.product.findMany()
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        cost: updateProductDto.cost,
        sellerId: updateProductDto.sellerId,
        productName: updateProductDto.productName,
        amountAvailable: updateProductDto.amountAvailable,
      },
    })
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
