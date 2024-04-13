import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AquariumService } from './aquarium.service';
import { Aquarium } from './entities/aquarium.entity';
import { Fish } from './entities/fish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aquarium, Fish])],
  providers: [AquariumService],
  exports: [AquariumService],
})
export class AquariumModule {}
