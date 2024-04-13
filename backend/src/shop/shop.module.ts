import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopService } from './shop.service';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';
import { FisheriesEntity } from './entities/fisheries.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AquariumBuffs]),
    TypeOrmModule.forFeature([FisheriesEntity]),
    UserService,
  ],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
