import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Colour {
  red = 'red',
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  yellow = 'yellow',
  orange = 'orange',
  cyan = 'cyan',
  emerald = 'emerald',
}

export enum Type {
  carp = 'carp',
  sturgeon = 'sturgeon',
  clownfish = 'clownfish',
  goldfish = 'goldfish',
  tang = 'tang',
}

@Entity()
export class FisheriesEntity {
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
}
