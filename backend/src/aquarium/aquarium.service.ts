import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aquarium } from './entities/aquarium.entity';
import { Fish } from './entities/fish.entity';

@Injectable()
export class AquariumService {
  constructor(
    @InjectRepository(Aquarium)
    private aquariumRepository: Repository<Aquarium>,
    @InjectRepository(Fish)
    private fishRepository: Repository<Fish>,
  ) {}

  async save(aquarium: Aquarium): Promise<any> {
    return this.aquariumRepository.save(aquarium);
  }

  async update(criteria: any, update: Partial<Aquarium>): Promise<any> {
    return this.aquariumRepository.update(criteria, update);
  }

  generateDiesAt(): any {
    const now = new Date();
    const minTime = now.getTime() + 30 * 60 * 1000; // 30 minutes from now in milliseconds
    const maxTime = now.getTime() + 2 * 60 * 60 * 1000; // 2 hours from now in milliseconds
    const randomTime =
      Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    return new Date(randomTime);
  }
}
