import * as bcrypt from 'bcryptjs';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from './entities/user.entity';

import { ERROR, SUCCESS } from '@utils/responses';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenModel: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, firstName, password } = signupDto;

    const isUserExist = await this.userModel.findOne({ where: { email } });
    if (isUserExist) {
      throw new BadRequestException(ERROR.userExist);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userModel.create({
      firstName,
      email,
      password: hashedPassword,
    });
    await this.userModel.save(newUser);

    return { message: SUCCESS.userCreated };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(ERROR.wrongCredentials);
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException(ERROR.wrongCredentials);
    }

    return this.generateJwtTokens(user);
  }

  async refreshToken(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      where: {
        token: refreshToken,
        expiresAt: MoreThanOrEqual(new Date()),
      },
      relations: ['user'],
    });

    if (!token) {
      throw new UnauthorizedException(ERROR.refreshTokenInvalid);
    }

    await this.refreshTokenModel.delete(token.id);

    return this.generateJwtTokens(token.user);
  }

  async generateJwtTokens(userData: User) {
    const refreshTokenValue = uuidv4();
    const accessToken = this.jwtService.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      { expiresIn: '1d' },
    );
    await this.storeRefreshToken(refreshTokenValue, userData);

    return { accessToken, refreshToken: refreshTokenValue };
  }

  async storeRefreshToken(token: string, user: User) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.refreshTokenModel.delete({ user: { id: user.id } });

    const newRefreshToken = this.refreshTokenModel.create({
      token,
      user,
      expiresAt: expiryDate,
    });

    await this.refreshTokenModel.save(newRefreshToken);
  }
}
