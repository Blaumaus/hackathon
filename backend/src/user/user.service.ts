import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async findUser(nickname: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { nickname },
    });
  }

  public async createUser(user: Pick<User, 'password' | 'nickname'>) {
    return this.usersRepository.save({
      ...user,
    });
  }

  public async saveRefreshToken(userId: string, refreshToken: string) {
    return this.refreshTokenRepository.save({
      userId,
      refreshToken,
    });
  }

  public async findUserById(userId: string) {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  public async findRefreshToken(userId: string, refreshToken: string) {
    return this.refreshTokenRepository.findOne({
      where: {
        userId,
        refreshToken,
      },
    });
  }

  public async findOneWhere(where: Record<string, unknown>) {
    return this.usersRepository.findOne({
      where,
    });
  }

  public async findAll() {
    return this.usersRepository.find();
  }

  public async updateUser(id: string, data: Partial<User>) {
    return this.usersRepository.update(id, data);
  }

  public async deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
