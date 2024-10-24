import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZodiacService } from './zodiac.service';

@Controller('zodiac')
export class ZodiacController {
  constructor(private readonly zodiacService: ZodiacService) {}

  @Post('getZodiac')
  async getZodiac(@Body('birthdate') birthdate: string) {
    return this.zodiacService.getZodiac(birthdate);
  }
}
