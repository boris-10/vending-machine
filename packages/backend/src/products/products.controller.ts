import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common'

import { ProductsService } from './products.service'
import { User } from '../users/entities/user.entity'
import { UserRole } from '../users/user-role'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { CreateProductDto } from './dto/create-product.dto'
import { SignedInUser } from '../auth/decorators/signed-in-user.decorator'
import { UpdateProductDto } from './dto/update-product.dto'

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRole.Seller)
  create(@Body() createProductDto: CreateProductDto, @SignedInUser() user: User) {
    return this.productsService.create(user, createProductDto)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @Roles(UserRole.Seller)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @SignedInUser() user: User
  ) {
    const product = await this.productsService.findOne(id)
    if (!product) {
      throw new NotFoundException(`Product with id ${id} does not exits`)
    }
    if (product.seller.id !== user.id) {
      throw new ForbiddenException('You are not the owner of the product')
    }

    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @Roles(UserRole.Seller)
  async remove(@Param('id', ParseIntPipe) id: number, @SignedInUser() user: User) {
    const product = await this.productsService.findOne(id)
    if (!product) {
      throw new NotFoundException(`Product with id ${id} does not exits`)
    }
    if (product.seller.id !== user.id) {
      throw new ForbiddenException('You are not the owner of the product')
    }

    return this.productsService.remove(id)
  }
}
