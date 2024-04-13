import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopService } from './shop.service';

@ApiTags('Shop')
@Controller('v1/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
}
