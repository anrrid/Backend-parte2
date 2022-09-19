import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from 'src/dto/create-mensaje.dto';
import { Socket } from 'socket.io';
import normalizar from 'src/utils/normalizacion.util';

@WebSocketGateway()
export class MensajesGateway {
  constructor(private readonly mensajesService: MensajesService) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('userMessage')
  async handleMessage(@MessageBody() message: CreateMensajeDto): Promise<void> {
    await this.mensajesService.save(message);
    const mensajes = await this.mensajesService.getAll();
    this.server.emit('messageBoard', normalizar(mensajes));
  }

  @SubscribeMessage('connection')
  async handleConnection(client: Socket): Promise<void> {
    const mensajes = await this.mensajesService.getAll();
    client.emit('messageBoard', normalizar(mensajes));
  }
}
