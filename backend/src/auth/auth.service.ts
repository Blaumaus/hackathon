import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { ActionTokensService } from 'src/action-tokens/action-tokens.service';
import {
  ActionToken,
  ActionTokenType,
} from 'src/action-tokens/action-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private actionTokensService: ActionTokensService,
  ) {}

  public async generateJwtAccessToken(userId: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        algorithm: 'HS256',
        expiresIn: '7d',
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      },
    );
  }

  private async generateJwtRefreshToken(userId: string) {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        algorithm: 'HS256',
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      },
    );

    await this.userService.saveRefreshToken(userId, refreshToken);

    return refreshToken;
  }

  public async generateJwtTokens(userId: string) {
    const accessToken = await this.generateJwtAccessToken(userId);

    let refreshToken = 'NOT_AVAILABLE';

    refreshToken = await this.generateJwtRefreshToken(userId);

    return { accessToken, refreshToken };
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  public async validateUser(
    nickname: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findUser(nickname);

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  public async checkVerificationToken(
    token: string,
  ): Promise<ActionToken | null> {
    const actionToken = await this.actionTokensService.findActionToken(token);

    if (
      actionToken &&
      actionToken.action === ActionTokenType.EMAIL_VERIFICATION
    ) {
      return actionToken;
    }

    return null;
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);

    return hash(password, salt);
  }

  public async createUnverifiedUser(
    password: string,
    nickname: string,
  ): Promise<User> {
    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.createUser({
      password: hashedPassword,
      nickname,
    });

    return user;
  }

  public async checkRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const token = await this.userService.findRefreshToken(userId, refreshToken);
    return Boolean(token);
  }
}
