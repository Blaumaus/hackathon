import {
  Controller,
  Get,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUserId } from 'src/auth/decorators';
import { User } from './entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@UseGuards(JwtAccessTokenGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/me')
  @UseGuards(JwtAccessTokenGuard)
  async me(@CurrentUserId() user_id: string): Promise<Partial<User>> {
    if (!user_id) {
      return null;
    }

    const user = await this.userService.findOneWhere({ id: user_id });

    return user;
  }

  @Post('/update')
  @UseGuards(JwtAccessTokenGuard)
  async update(
    @CurrentUserId() user_id: string,
    @Body() data: Partial<User>,
  ): Promise<Partial<User>[]> {
    const user = await this.userService.findOneWhere({ id: user_id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!data.id) {
      throw new BadRequestException('User id is required');
    }

    const modifedData: Partial<User> = {
      nickname: data.nickname,
    };

    if (data.password) {
      modifedData.password = await this.authService.hashPassword(data.password);
    }

    await this.userService.updateUser(data.id, modifedData);
    return this.userService.findAll();
  }

  @Post('/delete')
  @UseGuards(JwtAccessTokenGuard)
  async delete(@CurrentUserId() user_id: string): Promise<Partial<User>[]> {
    const user = await this.userService.findOneWhere({ id: user_id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userService.deleteUser(user.id);
    return this.userService.findAll();
  }
}
