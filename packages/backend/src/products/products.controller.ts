import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common'
import { Roles } from '../auth/roles.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RoleGuard } from '../auth/role.guard'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { CurrentUser } from '../auth/current-user.decorator'

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @Roles('seller')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser('id') userId: number
  ) {
    const product = await this.productsService.findOne(id)
    if (product.sellerId !== userId) {
      throw new ForbiddenException("Cannot update another seller's product")
    }

    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @Roles('seller')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser('id') userId: number) {
    const product = await this.productsService.findOne(id)
    if (product.sellerId !== userId) {
      throw new ForbiddenException("Cannot remove another seller's product")
    }

    return this.productsService.remove(id)
  }
}
