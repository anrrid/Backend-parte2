import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'coderhouse' }),
    AuthModule,
    UsersModule,
    MensajesModule,
    InfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
