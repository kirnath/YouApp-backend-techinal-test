import { Body, Controller, Get, Headers, Patch, Post, Put, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateDto } from './dtos/update.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signupData: SignupDto) {
    console.log(signupData);
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Get('getProfile')
  async profile(@Headers('authorization') authHeader: string) {
    try {
      const token = authHeader.split(' ')[1];
      return this.authService.profile(token);
    } catch (error) {
     throw new UnauthorizedException('Invalid token'); 
    }
  }

  @Post('createProfile')
  async createProfile(@Headers('authorization') authHeader: string, @Body() updateData) {
    const token = authHeader.split(' ')[1];
    console.log(updateData)
    return this.authService.updateProfile(token, updateData);
  }

  @Patch('updateProfile')
  async updateProfile(@Headers('authorization') authHeader: string, @Body() updateData: UpdateDto) {
    const token = authHeader.split(' ')[1];
    return this.authService.updateProfile(token, updateData);
  }

}
