import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';
import { ActionTokensModule } from 'src/action-tokens/action-tokens.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ActionTokensModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
