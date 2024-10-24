import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
