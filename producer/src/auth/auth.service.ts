import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateDto } from './dtos/update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    const { username, email, password } = signupData;

    const emailInUse = await this.UserModel.findOne({ email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const usernameInUse = await this.UserModel.findOne({ username });
    if (usernameInUse) {
      throw new BadRequestException('Username already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await this.UserModel.create({ username, email, password: hashPassword });
  }

  async login(credentials: LoginDto) {
    const { usernameOrEmail, password } = credentials;
    const user = await this.UserModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateAccessToken(user._id);
    return { message: 'success', accessToken };
  }

  async profile(token: string) {
    try {
      const { userId } = await this.jwtService.verify(token);
      const user = await this.UserModel.findById(userId).select('-password');
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async updateProfile(token: string, updateData: UpdateDto) {
    try {
      const { userId } = await this.jwtService.verify(token);
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      console.log(updateData)
      const update = await this.UserModel.findByIdAndUpdate(userId, updateData, {new: true}).select('-password');
      return update
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateAccessToken(userId) {
    const accessToken = this.jwtService.sign({ userId });
    return accessToken;
  }
}
