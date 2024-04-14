import { Module } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';
import { TaskManagerService } from './task-manager.service';
import { AquariumModule } from 'src/aquarium/aquarium.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ShopModule, AquariumModule, UserModule],
  providers: [TaskManagerService],
  exports: [TaskManagerService],
})
export class TaskManagerModule {}
