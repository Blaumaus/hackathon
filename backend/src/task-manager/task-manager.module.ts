import { Module } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';
import { TaskManagerService } from './task-manager.service';
import { AquariumModule } from 'src/aquarium/aquarium.module';

@Module({
  imports: [ShopModule, AquariumModule],
  providers: [TaskManagerService],
  exports: [TaskManagerService],
})
export class TaskManagerModule {}
