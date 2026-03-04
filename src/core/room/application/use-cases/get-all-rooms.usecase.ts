import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN } from "src/common/constant/repository.config";
import { IRoomRepository } from "../../domain/repositories/room.repository";

@Injectable()
export class GetAllRoomsUseCase {
  constructor(
    @Inject(REPOSITORY_TOKEN.ROOM)
    private readonly roomRepo: IRoomRepository,
  ) {}

  async execute() {
    return await this.roomRepo.findAll();
  }
}
