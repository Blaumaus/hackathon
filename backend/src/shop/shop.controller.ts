import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { CurrentUserId } from 'src/auth/decorators';
import { ShopService } from './shop.service';

@ApiTags('Shop')
@Controller('v1/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/consumables')
  @UseGuards(JwtAccessTokenGuard)
  async update(@CurrentUserId() uid: string): Promise<any[]> {}
}
