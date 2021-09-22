import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create({ id }: User, createProductDto: CreateProductDto) {
    const product = await this.productRepository.create({
      ...createProductDto,
      seller: { id },
    })

    return this.productRepository.save(product)
  }

  findAll() {
    return this.productRepository.find()
  }

  findOne(id: number) {
    return this.productRepository.findOne(id, { relations: ['seller'] })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, updateProductDto)
  }

  remove(id: number) {
    return this.productRepository.delete(id)
  }
}
