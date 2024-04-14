import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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
    type: 'datetime',
    nullable: false,
  })
  diesAt: Date;

  @ManyToOne(() => Aquarium, (aquarium) => aquarium.fishes)
  aquarium: Aquarium;

  @CreateDateColumn()
  createdAt: Date;
}
