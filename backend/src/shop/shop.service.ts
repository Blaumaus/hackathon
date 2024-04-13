import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _pick from 'lodash/pick';
import { Repository } from 'typeorm';
import { AquariumBuffs } from './entities/aquariumBuffs.entity';
import { FisheriesEntity } from './entities/fisheries.entity';
import { AquariumService } from 'src/aquarium/aquarium.service';
import { Aquarium } from 'src/aquarium/entities/aquarium.entity';
import { Fish } from 'src/aquarium/entities/fish.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(AquariumBuffs)
    private aquariumBuffsRepository: Repository<AquariumBuffs>,
    @InjectRepository(FisheriesEntity)
    private fisheriesRepository: Repository<FisheriesEntity>,
    private readonly aquariumService: AquariumService,
  ) {}

  async createFishery(entity: FisheriesEntity): Promise<FisheriesEntity> {
    return this.fisheriesRepository.save(entity);
  }

  async updateFishery(
    criteria: any,
    update: Record<string, unknown>,
  ): Promise<any> {
    return this.fisheriesRepository.update(criteria, update);
  }

  async deleteFishery(params: any): Promise<any> {
    return this.fisheriesRepository.delete(params);
  }

  async findFishery(params?: any): Promise<FisheriesEntity[]> {
    return this.fisheriesRepository.find(params);
  }

  async findOneFishery(where: any, params: any = {}): Promise<FisheriesEntity> {
    return this.fisheriesRepository.findOne({
      where,
      ...params,
    });
  }

  async createBuff(entity: AquariumBuffs): Promise<AquariumBuffs> {
    return this.aquariumBuffsRepository.save(entity);
  }

  async updateBuff(
    criteria: any,
    update: Record<string, unknown>,
  ): Promise<any> {
    return this.aquariumBuffsRepository.update(criteria, update);
  }

  async deleteBuff(params: any): Promise<any> {
    return this.aquariumBuffsRepository.delete(params);
  }

  async findBuff(params?: any): Promise<AquariumBuffs[]> {
    return this.aquariumBuffsRepository.find(params);
  }

  async findOneBuff(where: any, params: any = {}): Promise<AquariumBuffs> {
    return this.aquariumBuffsRepository.findOne({
      where,
      ...params,
    });
  }

  async applyConsumableToAquarium(
    aquarium: Aquarium,
    consumable: AquariumBuffs,
  ): Promise<void> {
    let buff =
      aquarium[consumable.type] + aquarium[consumable.type] * consumable.buff;

    if (buff > 1) {
      buff = 1;
    }

    await this.aquariumService.update(aquarium.id, {
      [consumable.type]: buff,
    });
  }

  async applyFishToAquarium(
    aquarium: Aquarium,
    shopFish: FisheriesEntity,
  ): Promise<void> {
    const fish = new Fish();
    Object.assign(
      fish,
      _pick(shopFish, ['price', 'type', 'colour', 'speedMultiplier']),
    );
    fish.diesAt = this.aquariumService.generateDiesAt();

    aquarium.fishes.push(fish);

    await this.aquariumService.save(aquarium);
  }
}
