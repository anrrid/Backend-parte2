import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producto, ProductoDocument } from './productos.schema';
import { Model } from 'mongoose';
import { ReturnProductDto } from '../dto/return-product.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
  ) {}
  async create(producto: Producto): Promise<Producto> {
    const nuevoProducto = new this.productoModel(producto);
    return await nuevoProducto.save();
  }
  async getAll(): Promise<ReturnProductDto[]> {
    const allProds = await this.productoModel.find().exec();
    return allProds.map(
      (prod) =>
        new ReturnProductDto(prod._id, prod.nombre, prod.precio, prod.foto),
    );
  }
  async getById(id: string): Promise<ReturnProductDto> {
    const res = await this.productoModel.findById(id).exec();
    return new ReturnProductDto(res._id, res.nombre, res.precio, res.foto);
  }
  async update(id: string, data: Producto): Promise<ReturnProductDto> {
    const updated = await this.productoModel.findByIdAndUpdate(id, data).exec();
    return new ReturnProductDto(
      updated._id,
      updated.nombre,
      updated.precio,
      updated.foto,
    );
  }
  async delete(id: string): Promise<ReturnProductDto[]> {
    await this.productoModel.findByIdAndRemove(id).exec();
    return await this.getAll();
  }
}
