import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MensajesDocument = Mensajes & Document;

@Schema()
export class Mensajes {
  @Prop({ required: true, type: Object })
  author: object;

  @Prop({ required: true })
  text: string;
}

export const MensajesSchema = SchemaFactory.createForClass(Mensajes);
