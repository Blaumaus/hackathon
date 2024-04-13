import { Module } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';
import { TaskManagerService } from './task-manager.service';

@Module({
  imports: [ShopModule],
  providers: [TaskManagerService],
  exports: [TaskManagerService],
})
export class TaskManagerModule {}
