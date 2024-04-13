import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopService } from './shop.service';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';
import { FisheriesEntity } from './entities/fisheries.entity';
import { ShopController } from './shop.controller';
import { UserModule } from 'src/user/user.module';
import { AquariumModule } from 'src/aquarium/aquarium.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AquariumBuffs, FisheriesEntity]),
    UserModule,
    AquariumModule,
  ],
  providers: [ShopService],
  exports: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
