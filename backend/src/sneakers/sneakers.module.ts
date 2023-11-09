import { Module } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [SneakersController],
  providers: [SneakersService, PrismaService, FileService],
})
export class SneakersModule {}
