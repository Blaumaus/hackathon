import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { CurrentUserId } from 'src/auth/decorators';
import { ShopService } from './shop.service';
import { BuyConsumableDto } from './dto/buy-consumable.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('Shop')
@Controller('v1/shop')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
  ) {}

  // Get all available consumables
  @Get('/consumables')
  @UseGuards(JwtAccessTokenGuard)
  async getConsumables(@CurrentUserId() uid: string): Promise<any[]> {
    return this.shopService.findBuff();
  }

  // Buy a consumable
  @Post('/consumables')
  @UseGuards(JwtAccessTokenGuard)
  async buyConsumables(
    @CurrentUserId() uid: string,
    @Body() body: BuyConsumableDto,
  ): Promise<void> {
    const user = await this.userService.findUserById(uid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const consumable = await this.shopService.findOneBuff({
      id: body.consumableId,
    });

    if (!consumable) {
      throw new NotFoundException('Selected consumable does not exist');
    }

    if (user.money < consumable.price) {
      throw new ForbiddenException(
        `You need ${
          consumable.price - user.money
        } more money to buy this consumable`,
      );
    }

    await this.userService.updateUser(user.id, {
      money: user.money - consumable.price,
    });

    await this.shopService.applyConsumableToAquarium(user.aquarium, consumable);
  }
}
