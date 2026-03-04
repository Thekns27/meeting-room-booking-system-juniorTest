import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateBookingUseCase } from '../application/use-cases/create-booking.usecase';
import { GetMyBookingsUseCase } from '../application/use-cases/get-my-bookings.usecase';
import { CancelBookingUseCase } from '../application/use-cases/cancle-booking.usecase';
import { GetAllBookingsUseCase } from '../application/use-cases/get-all-bookings.usecase';
import { GetRoomBookingsUseCase } from '../application/use-cases/get-room-bookings.usecase';
import { CreateBookingDto } from '../application/dtos/create-booking.dto';
import { RolesGuard } from 'src/module/auth/guards/role.guard';

@ApiTags('Bookings')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly getMyBookingsUseCase: GetMyBookingsUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase,
    private readonly getAllBookingsUseCase: GetAllBookingsUseCase,
    private readonly getRoomBookingsUseCase: GetRoomBookingsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'creating booking' })
  async create(@Body() dto: CreateBookingDto, @Req() req: any) {
    return await this.createBookingUseCase.execute(req.user.id, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'get my bookings history' })
  async findMyBookings(@Req() req: any) {
    return await this.getMyBookingsUseCase.execute(req.user.id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'cancel booking' })
  async cancel(@Param('id') id: string, @Req() req: any) {
    return await this.cancelBookingUseCase.execute(
      id,
      req.user.id,
      req.user.role,
    );
  }

  @Get()
  // @Roles('ADMIN')
  @ApiOperation({ summary: 'get all bookings by admin' })
  async findAll() {
    return await this.getAllBookingsUseCase.execute();
  }

  @Get('room/:roomId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'get room bookings by admin' })
  async findByRoom(@Param('roomId') roomId: string) {
    return await this.getRoomBookingsUseCase.execute(roomId);
  }
}
