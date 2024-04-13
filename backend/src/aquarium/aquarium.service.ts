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

  async update(criteria: any, update: Partial<Aquarium>): Promise<any> {
    return this.aquariumRepository.update(criteria, update);
  }
}
