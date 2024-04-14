import {
  Controller,
  Post,
  Body,
  ConflictException,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { CurrentUserId, CurrentUser } from './decorators';
import * as _isString from 'lodash/isString';
import {
  FisheriesEntity,
  COLOURS,
  TYPES,
} from 'src/shop/entities/fisheries.entity';
import * as _sample from 'lodash/sample';
import * as _random from 'lodash/random';
import { ShopService } from 'src/shop/shop.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  @Post('register')
  public async register(
    @Body()
    body: {
      nickname: string;
      password: string;
    },
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.userService.findUser(body.nickname);

    if (user) {
      throw new ConflictException('User already exists');
    }

    if (body.nickname === body.password) {
      throw new ConflictException(
        'Password should not be the same as nickname',
      );
    }

    const newUser = await this.authService.createUnverifiedUser(
      body.nickname,
      body.password,
    );

    const jwtTokens = await this.authService.generateJwtTokens(newUser.id);

    const fishes = [];
    for (let i = 0; i < 1; ++i) {
      const fish = new FisheriesEntity();
      fish.colour = _sample(COLOURS);
      fish.type = _sample(TYPES);
      fish.speedMultiplier = _random(0.01, 1);
      fish.price = _random(20, 300);

      fishes.push(fish);
    }

    await this.shopService.applyFishToAquarium(null, fishes[0], newUser);

    return {
      ...jwtTokens,
      user: newUser,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body()
    body: {
      nickname: string;
      password: string;
    },
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    const user = await this.authService.validateUser(
      body.nickname,
      body.password,
    );

    if (!user) {
      throw new ConflictException('Invalid credentials');
    }

    const jwtTokens = await this.authService.generateJwtTokens(user.id);

    return {
      ...jwtTokens,
      user: user,
    };
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshTokenGuard)
  @HttpCode(200)
  public async refreshToken(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid = await this.authService.checkRefreshToken(
      user.id,
      refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new ConflictException('Invalid refresh token');
    }

    const accessToken = await this.authService.generateJwtAccessToken(user.id);

    return { accessToken };
  }
}
