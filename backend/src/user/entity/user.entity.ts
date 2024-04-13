import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { ActionToken } from '../../action-tokens/action-token.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 60, default: '' })
  password: string;

  @OneToMany(() => ActionToken, (actionToken) => actionToken.user)
  actionTokens: ActionToken[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  @JoinTable()
  refreshTokens: RefreshToken[];

  @Column('varchar', { length: 60, default: '' })
  nickname: string;
}
