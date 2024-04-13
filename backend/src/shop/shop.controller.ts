import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as _find from 'lodash/find';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { CurrentUserId } from 'src/auth/decorators';
import { ShopService } from './shop.service';
import { BuyConsumableDto } from './dto/buy-consumable.dto';
import { UserService } from 'src/user/user.service';
import { BuyFishDto } from './dto/buy-fish.dto';
import { AquariumService } from 'src/aquarium/aquarium.service';

@ApiTags('Shop')
@Controller('v1/shop')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly aquariumService: AquariumService,
  ) {}

  // Get all available consumables
  @Get('/consumables')
  @UseGuards(JwtAccessTokenGuard)
  async getConsumables(@CurrentUserId() uid: string): Promise<any[]> {
    return this.shopService.findBuff();
  }

  // Get all available consumables
  @Get('/fish')
  @UseGuards(JwtAccessTokenGuard)
  async getFish(@CurrentUserId() uid: string): Promise<any[]> {
    return this.shopService.findFishery();
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

  // Buy a consumable
  @Post('/fish')
  @UseGuards(JwtAccessTokenGuard)
  async buyFish(
    @CurrentUserId() uid: string,
    @Body() body: BuyFishDto,
  ): Promise<void> {
    const user = await this.userService.findUserById(uid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fish = await this.shopService.findOneFishery({
      id: body.fishId,
    });

    if (!fish) {
      throw new NotFoundException('Selected fish does not exist');
    }

    if (user.money < fish.price) {
      throw new ForbiddenException(
        `You need ${fish.price - user.money} more money to buy this fish`,
      );
    }

    await this.userService.updateUser(user.id, {
      money: user.money - fish.price,
    });

    await this.shopService.applyFishToAquarium(user.aquarium, fish);
  }

  // Sell a fish
  @Delete('/fish/:id')
  @UseGuards(JwtAccessTokenGuard)
  async sellFish(
    @Param('id') fishId: string,
    @CurrentUserId() uid: string,
  ): Promise<void> {
    const user = await this.userService.findUserById(uid, [
      'aquarium',
      'aquarium.fishes',
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fish = _find(user.aquarium.fishes, (aqFish) => aqFish.id === fishId);

    if (!fish) {
      throw new NotFoundException(
        "The fish you're trying to sell does not belong to you",
      );
    }

    await this.aquariumService.deleteFish(fish.id);

    await this.userService.updateUser(user.id, {
      money: user.money + fish.price,
    });
  }
}
