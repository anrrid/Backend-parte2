import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.productosService.create(createProductDto);
  }
  @Get()
  async fetchAll(): Promise<any> {
    return await this.productosService.getAll();
  }
  @Get('/:id')
  async fetchOne(@Param('id') id: string): Promise<any> {
    return await this.productosService.getById(id);
  }
  @Put('/:id')
  async edit(
    @Param('id') id: string,
    @Body() producto: CreateProductDto,
  ): Promise<any> {
    return await this.productosService.update(id, producto);
  }
  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return await this.productosService.delete(id);
  }
}
