import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopService } from './shop.service';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';
import { FisheriesEntity } from './entities/fisheries.entity';
import { UserService } from 'src/user/user.service';
import { AquariumService } from 'src/aquarium/aquarium.service';
import { ShopController } from './shop.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AquariumBuffs, FisheriesEntity]),
    UserService,
    AquariumService,
  ],
  providers: [ShopService],
  exports: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
