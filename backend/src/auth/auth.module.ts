import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ActionTokensModule } from 'src/action-tokens/action-tokens.module';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ActionTokensModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
