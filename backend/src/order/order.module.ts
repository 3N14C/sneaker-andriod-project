import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { SneakersService } from 'src/sneakers/sneakers.service';
import { FileService } from 'src/file/file.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, FileService, SneakersService, PrismaService]
})
export class OrderModule {}
