import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Roles } from '../auth/roles.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RoleGuard } from '../auth/role.guard'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('seller')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  @Roles('seller')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  @Roles('seller')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
