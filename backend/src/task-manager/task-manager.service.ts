import { Injectable } from '@nestjs/common';
import * as _sample from 'lodash/sample';
import * as _random from 'lodash/random';
import * as _map from 'lodash/map';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  FisheriesEntity,
  COLOURS,
  TYPES,
} from 'src/shop/entities/fisheries.entity';
import { TYPES as CONSUMABLE_TYPES } from 'src/shop/entities/aquariumBuffs.entity';

import { ShopService } from 'src/shop/shop.service';
import { In } from 'typeorm';
import { AquariumBuffs } from 'src/shop/entities/aquariumBuffs.entity';
import { AquariumService } from 'src/aquarium/aquarium.service';
import { UserService } from 'src/user/user.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TaskManagerService {
  constructor(
    private readonly shopService: ShopService,
    private readonly aquariumService: AquariumService,
    private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async refreshShopFishes(): Promise<void> {
    // used to remove all current fishes from shop
    const currentFishes = await this.shopService.findFishery();

    const fishes = [];

    // generating 10 fishes
    for (let i = 0; i < 10; ++i) {
      const fish = new FisheriesEntity();
      fish.colour = _sample(COLOURS);
      fish.type = _sample(TYPES);
      fish.speedMultiplier = _random(0.01, 1);
      fish.price = _random(20, 300);

      fishes.push(fish);
    }

    await this.shopService.createFishery(fishes);

    await this.shopService.deleteFisheryBuilder({
      id: In(_map(currentFishes, ({ id }) => id)),
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async refreshShopConsumables(): Promise<void> {
    // used to remove all current fishes from shop
    const currentConsumables = await this.shopService.findBuff();

    const consumables = [];

    // generating 10 fishes
    for (let i = 0; i < 10; ++i) {
      const consumable = new AquariumBuffs();
      consumable.price = _random(5, 50);
      consumable.buff = _random(0.1, 0.7);
      consumable.type = _sample(CONSUMABLE_TYPES);

      consumables.push(consumable);
    }

    await this.shopService.createBuff(consumables);

    await this.shopService.deleteBuffBuilder({
      id: In(_map(currentConsumables, ({ id }) => id)),
    });
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateAquariumStatus(): Promise<void> {
    const aquariums = await this.aquariumService.find();
    const promises = [];

    for (let i = 0; i < aquariums.length; ++i) {
      const aquarium = aquariums[i];

      promises.push(
        this.aquariumService.update(aquarium.id, {
          happiness: aquarium.happiness - _random(0, 0.03),
          cleanliness: aquarium.cleanliness - _random(0, 0.03),
          hunger: aquarium.hunger - _random(0, 1),
        }),
      );
    }

    // todo: maybe refactor this to create multiple fishes with 1 DB call (i.e. insert())
    await Promise.all(promises);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async giveUsersMoney(): Promise<void> {
    const users = await this.userService.findAll();

    const promises = [];

    for (let i = 0; i < users.length; ++i) {
      const user = users[i];

      promises.push(
        this.userService.updateUser(user.id, {
          money: user.money + _random(5, 50),
        }),
      );
    }

    await Promise.all(promises);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async killFishes(): Promise<void> {
    const aquariums = await this.aquariumService.find();

    const promises = [];

    for (let i = 0; i < aquariums.length; ++i) {
      const aquarium = aquariums[i];

      for (let j = 0; j < aquarium.fishes.length; ++j) {
        const fish = aquarium.fishes[j];

        if (dayjs().isAfter(dayjs(fish.diesAt).add(5, 'minute'))) {
          promises.push(this.aquariumService.deleteFish(fish.id));
        }
      }
    }

    await Promise.all(promises);
  }
}
