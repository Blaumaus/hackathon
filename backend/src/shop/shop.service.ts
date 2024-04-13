import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(AquariumBuffs)
    private aquariumBuffsRepository: Repository<AquariumBuffs>,
  ) {}

  async createBuff(entity: AquariumBuffs): Promise<AquariumBuffs> {
    return this.aquariumBuffsRepository.save(entity);
  }

  async updateBuff(
    criteria: any,
    update: Record<string, unknown>,
  ): Promise<any> {
    return this.aquariumBuffsRepository.update(criteria, update);
  }

  async deleteBuff(id: string): Promise<any> {
    return this.aquariumBuffsRepository.delete(id);
  }

  async findBuff(params: any): Promise<AquariumBuffs[]> {
    return this.aquariumBuffsRepository.find(params);
  }

  async findOneBuff(where: any, params: any = {}): Promise<AquariumBuffs> {
    return this.aquariumBuffsRepository.findOne({
      where,
      ...params,
    });
  }
}
