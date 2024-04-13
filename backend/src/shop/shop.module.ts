import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopService } from './shop.service';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AquariumBuffs])],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
