import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(
    public readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: { sub: string; iat: number; exp: number }) {
    const user = await this.userService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
