import { IsUUID } from 'class-validator';

export class BuyFishDto {
  @IsUUID('4')
  readonly fishId: string;
}
