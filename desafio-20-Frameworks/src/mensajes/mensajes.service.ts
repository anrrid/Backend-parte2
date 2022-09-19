import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mensajes, MensajesDocument } from './mensajes.schema';
import { Model } from 'mongoose';
import { CreateMensajeDto } from '../dto/create-mensaje.dto';
import { ReturnMensajeDto } from '../dto/return-mensaje.dto';

@Injectable()
export class MensajesService {
  constructor(
    @InjectModel(Mensajes.name)
    private readonly mensajesModel: Model<MensajesDocument>,
  ) {}

  async save(mensaje: CreateMensajeDto): Promise<void> {
    const nuevoMensaje = new this.mensajesModel(mensaje);
    await nuevoMensaje.save();
  }

  async getAll(): Promise<ReturnMensajeDto[]> {
    const allMsgs = await this.mensajesModel.find().lean().exec();
    return allMsgs.map(
      (msg) => new ReturnMensajeDto(msg._id, msg.author, msg.text),
    );
  }
}
