import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SizeDto } from './dto/size.dto';

@Injectable()
export class SizeService {
    constructor(private prisma: PrismaService) {}

    async create(dto: SizeDto) {
        const oldSize = await this.prisma.size.findUnique({
            where: {
                name: dto.name
            }
        })

        if(oldSize) throw new BadRequestException('Size already in use')

        const size = await this.prisma.size.create({
            data: {
                ...dto
            },

            include: {
                sneaker: true
            }
        })

        return size
    }

    async getAll() {
        const size = await this.prisma.size.findMany({
            include: {
                sneaker: {
                    include: {
                        size: true
                    }
                }
            }
        })

        return size
    }
}
