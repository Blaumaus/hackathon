import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aquarium } from './entities/aquarium.entity';
import { Fish } from './entities/fish.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class AquariumService {
  constructor(
    @InjectRepository(Aquarium)
    private aquariumRepository: Repository<Aquarium>,
    @InjectRepository(Fish)
    private fishRepository: Repository<Fish>,
  ) {}

  async save(aquarium: Omit<Aquarium, 'id'>): Promise<Aquarium> {
    return this.aquariumRepository.save(aquarium);
  }

  async update(criteria: any, update: Partial<Aquarium>): Promise<any> {
    return this.aquariumRepository.update(criteria, update);
  }

  async find(criteria?: any): Promise<Aquarium[]> {
    return this.aquariumRepository.find(criteria);
  }

  async findOne(criteria: any): Promise<Aquarium> {
    return this.aquariumRepository.findOne(criteria);
  }

  async findById(id: string, relations = ['fishes']): Promise<Aquarium> {
    return this.aquariumRepository.findOne({
      where: { id },
      relations,
    });
  }

  async deleteFish(id: string) {
    return this.fishRepository.delete(id);
  }

  async updateFish(criteria: any, update: Partial<Fish>): Promise<any> {
    return this.fishRepository.update(criteria, update);
  }

  generateDiesAt(): any {
    const now = new Date();
    const minTime = now.getTime() + 30 * 60 * 1000; // 30 minutes from now in milliseconds
    const maxTime = now.getTime() + 2 * 60 * 60 * 1000; // 2 hours from now in milliseconds
    const randomTime =
      Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    return new Date(randomTime);
  }

  async getAquariumStats(userId) {
    const res = await this.aquariumRepository.find({
      relations: ['fishes', 'user'],
      where: {
        user: {
          id: userId,
        },
      },
    });
    const aquarium = res[0];

    if (!aquarium) {
      return null;
    }

    return {
      id: aquarium.id,
      aquariumStatus: {
        happiness: aquarium.happiness,
        hunger: aquarium.hunger,
        cleanliness: aquarium.cleanliness,
      },
      fishes: aquarium.fishes.map((fish) => ({
        id: fish.id,
        lived: dayjs().diff(fish.createdAt, 'second'),
        speedMultiplier: fish.speedMultiplier,
        isDead: dayjs().isAfter(fish.diesAt),
        colour: fish.colour,
        type: fish.type,
        sellPrice: fish.price,
      })),
    };
  }
}
