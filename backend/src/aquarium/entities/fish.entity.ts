import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Aquarium } from './aquarium.entity';
import { Colour, Type } from 'src/shop/entities/fisheries.entity';

@Entity()
export class Fish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  price: number;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: Colour,
  })
  colour: Colour;

  @Column({
    type: 'float', // (0, 1]
  })
  speedMultiplier: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  diesAt: Date;

  @ManyToOne(() => Aquarium, (aquarium) => aquarium.fishes)
  @JoinColumn()
  aquarium: Aquarium;
}