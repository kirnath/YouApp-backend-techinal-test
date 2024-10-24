import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('new_message')
  handleNewMessage(@Payload() message: CreateMessageDto) {
    return this.appService.messageReceived(message);
  }
}
