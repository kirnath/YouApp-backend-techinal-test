import { Controller, Post, Body, Get, Query, UseGuards, Req, HttpException, BadRequestException } from '@nestjs/common';
import { MessagesService } from './message.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/auth.decorator';


@Controller('api')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('sendMessage')
  async create(
    @User() user: { userId: string },
    @Body() createMessageDto: { receiverId: string; content: string },
  ) {
    if(!createMessageDto.receiverId || !createMessageDto.content) {
      throw new BadRequestException("ReceiverId and content are required");
    }
    return this.messagesService.create(
      user.userId,
      createMessageDto.receiverId,
      createMessageDto.content,
    );
    
  }

  @Get('viewMessages')
  async findConversation(
    @User() user: { userId: string },
  ) {
    return this.messagesService.findConversation(user.userId);
  }
}

