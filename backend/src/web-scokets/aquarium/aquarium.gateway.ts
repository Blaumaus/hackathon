import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Aquarium } from 'src/aquarium/entities/aquarium.entity';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import * as dayjs from 'dayjs';

@WebSocketGateway()
export class AquariumGateway {
  constructor(
    @InjectRepository(Aquarium)
    private readonly aquariumRepository: Repository<Aquarium>,
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('getAquariums')
  async getAquariums(client: Socket, aquariumId: string) {
    const token = client.handshake.headers['authorization'];
    const user = await this.userService.findOneWhere({ id: token });

    if (!user) {
      return;
    }

    const aquariums = await this.aquariumRepository.find({
      where: { user: user, id: aquariumId },
      relations: ['fishes'],
    });

    const response = aquariums.map((aquarium) => ({
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
        diesAt: fish.diesAt,
        colour: fish.colour,
        type: fish.type,
        sellPrice: fish.price,
      })),
    }));

    client.emit('aquariums', response);
  }
}
