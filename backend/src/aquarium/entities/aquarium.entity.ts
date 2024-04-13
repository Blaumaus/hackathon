import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Fish } from './fish.entity';
import { User } from '../../user/entity/user.entity';

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

  @OneToOne(() => User, (user) => user.aquarium)
  user: User;
}
