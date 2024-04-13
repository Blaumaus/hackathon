import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ConsumableType {
  happiness = 'happiness',
  cleanliness = 'cleanliness',
  hunger = 'hunger',
}

@Entity()
export class AquariumBuffs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  price: number;

  // between 0 and 1 - recovers a %
  @Column({
    type: 'float',
  })
  buff: number;

  @Column({
    type: 'enum',
    enum: ConsumableType,
  })
  type: ConsumableType;
}
