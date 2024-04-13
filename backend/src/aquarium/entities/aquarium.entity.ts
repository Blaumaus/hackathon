import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fish } from './fish.entity';

@Entity()
export class Aquarium {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float', // (0, 1],
    default: 0.9,
  })
  happiness: number;

  @Column({
    type: 'float', // (0, 1]
    default: 0.9,
  })
  cleanliness: number;

  @Column({
    type: 'float', // (0, 1]
    default: 0.9,
  })
  hunger: number;

  @OneToMany(() => Fish, (fish) => fish.aquarium, {
    cascade: true,
  })
  fishes: Fish[];
}
