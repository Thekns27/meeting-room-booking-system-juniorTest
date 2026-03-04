import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { Room } from '../domain/entities/room.entity';
import { IRoomRepository } from '../domain/repositories/room.repository';

@Injectable()
export class PrismaRoomRepository implements IRoomRepository {
  constructor(
    private readonly prisma: PrismaService
) {}

  async save(room: Room): Promise<any> {
    const data = room.toPrimitives;
    return await this.prisma.room.upsert({
      where: { id: data.id || '' },
      update: {
        name: data.name,
        capacity: data.capacity,
        location: data.location,
        created_at: data.createdAt,
      },
      create: {
        name: data.name,
        capacity: data.capacity,
        location: data.location,
        created_at: data.createdAt,
      },
    });
  }

  async findByName(name: string): Promise<any> {
    return await this.prisma.room.findFirst({
      where: { name },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.room.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.room.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async delete(id: string): Promise<any> {
    return  await this.prisma.room.delete({
      where: { id },
    });
  }

}

