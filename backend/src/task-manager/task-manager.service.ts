import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class TaskManagerService {
  constructor(private readonly shopService: ShopService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async addFishesToShop(): Promise<void> {
    // todo
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async addConsumablesToShop(): Promise<void> {
    // todo
  }
}
