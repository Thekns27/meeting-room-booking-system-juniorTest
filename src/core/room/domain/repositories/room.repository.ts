import { Room } from '../entities/room.entity';

export abstract class IRoomRepository {
  abstract save(room: Room): Promise<Room>;
  abstract findAll(): Promise<Room[]>;
  abstract findById(id: string): Promise<Room | null>;
  abstract findByName(name: string): Promise<any | null>;
  abstract delete(id: string): Promise<Room | null>;
}
