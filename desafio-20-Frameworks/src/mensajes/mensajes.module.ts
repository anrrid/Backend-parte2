import { Module } from '@nestjs/common';
import { MensajesGateway } from './mensajes.gateway';
import { MensajesService } from './mensajes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mensajes, MensajesSchema } from './mensajes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mensajes.name, schema: MensajesSchema },
    ]),
  ],
  providers: [MensajesGateway, MensajesService],
})
export class MensajesModule {}
