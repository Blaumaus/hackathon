import { IsUUID } from 'class-validator';

export class BuyConsumableDto {
  @IsUUID('4')
  readonly consumableId: string;
}
