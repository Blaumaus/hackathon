import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ActionToken } from '../../action-tokens/action-token.entity';
import { RefreshToken } from './refresh-token.entity';
import { Aquarium } from '../../aquarium/entities/aquarium.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 60, default: '' })
  password: string;

  @Column({
    type: 'integer',
    default: 250,
  })
  money: number;

  @OneToMany(() => ActionToken, (actionToken) => actionToken.user)
  actionTokens: ActionToken[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  @JoinTable()
  refreshTokens: RefreshToken[];

  @Column('varchar', { length: 60, default: '' })
  nickname: string;

  @OneToOne(() => Aquarium, (aquarium) => aquarium.user)
  @JoinColumn()
  aquarium: Aquarium;
}
