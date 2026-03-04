import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateRoomDto } from '../application/dtos/create-room.dto';
import { PrismaService } from 'src/core/infrastructure/prisma/prisma.service';
import { CreateRoomUseCase } from '../application/use-cases/create-room.usecase';
import { GetAllRoomsUseCase } from '../application/use-cases/get-all-rooms.usecase';
import { GetRoomDetailUseCase } from '../application/use-cases/get-room-details.usecase';
import { UpdateRoomUseCase } from '../application/use-cases/update-room.usecase';
import { DeleteRoomUseCase } from '../application/use-cases/delete-room.usecase';
import { RolesGuard } from 'src/module/auth/guards/role.guard';

@ApiTags('Rooms')
// @ApiBearerAuth( 'JWT-auth' )
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly getAllRoomUseCase: GetAllRoomsUseCase,
    private readonly getRoomDetailUseCase: GetRoomDetailUseCase,
    private readonly updateRoomUseCase: UpdateRoomUseCase,
    private readonly deleteRoomUseCase: DeleteRoomUseCase,
  ) {}

  @Post()
  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'created room by admin' })
  async create(@Body() dto: CreateRoomDto) {
    console.log(dto);

    return await this.createRoomUseCase.execute(dto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get all rooms' })
  async findAll() {
    return await this.getAllRoomUseCase.execute();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'details of a room' })
  async findOne(@Param('id') id: string) {
    return await this.getRoomDetailUseCase.execute(id);
  }

  @Put(':id')
  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'repair room data' })
  async update(@Param('id') id: string, @Body() dto: CreateRoomDto) {
    return await this.updateRoomUseCase.execute(id, dto);
  }

  @Delete(':id')
  // @Roles('ADMIN')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'room is deleted' })
  async remove(@Param('id') id: string) {
    return await this.deleteRoomUseCase.execute(id);
  }
}
