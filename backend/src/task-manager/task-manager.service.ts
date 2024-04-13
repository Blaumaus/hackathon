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

@Injectable()
export class TaskManagerService {
  constructor(
    private readonly shopService: ShopService,
    private readonly aquariumService: AquariumService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async refreshShopFishes(): Promise<void> {
    // used to remove all current fishes from shop
    const currentFishes = await this.shopService.findFishery();

    const promises = [];

    // generating 10 fishes
    for (let i = 0; i < 10; ++i) {
      const fish = new FisheriesEntity();
      fish.colour = _sample(COLOURS);
      fish.type = _sample(TYPES);
      fish.speedMultiplier = _random(0.01, 1);
      fish.price = _random(20, 300);

      promises.push(async () => this.shopService.createFishery(fish));
    }

    // todo: maybe refactor this to create multiple fishes with 1 DB call (i.e. insert())
    await Promise.all(promises);

    await this.shopService.deleteFisheryBuilder({
      id: In(_map(currentFishes, ({ id }) => id)),
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async refreshShopConsumables(): Promise<void> {
    // used to remove all current fishes from shop
    const currentConsumables = await this.shopService.findBuff();

    const promises = [];

    // generating 10 fishes
    for (let i = 0; i < 10; ++i) {
      const consumable = new AquariumBuffs();
      consumable.price = _random(5, 50);
      consumable.buff = _random(0.1, 0.7);
      consumable.type = _sample(CONSUMABLE_TYPES);

      promises.push(async () => this.shopService.createBuff(consumable));
    }

    // todo: maybe refactor this to create multiple fishes with 1 DB call (i.e. insert())
    await Promise.all(promises);

    await this.shopService.deleteBuffBuilder({
      id: In(_map(currentConsumables, ({ id }) => id)),
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateAquariumStatus(): Promise<void> {
    const aquariums = await this.aquariumService.find();

    const promises = [];

    for (let i = 0; i < aquariums.length; ++i) {
      const aquarium = aquariums[i];

      promises.push(async () =>
        this.aquariumService.update(aquarium.id, {
          happiness: aquarium.happiness - _random(0, 0.03),
          cleanliness: aquarium.cleanliness - _random(0, 0.03),
          hunger: aquarium.hunger - _random(0, 0.03),
        }),
      );
    }

    // todo: maybe refactor this to create multiple fishes with 1 DB call (i.e. insert())
    await Promise.all(promises);
  }
}
