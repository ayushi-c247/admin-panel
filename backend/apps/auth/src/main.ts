import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule,{ cors: true });
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log("app listen on port",configService.get('PORT'));
  
}
bootstrap();
