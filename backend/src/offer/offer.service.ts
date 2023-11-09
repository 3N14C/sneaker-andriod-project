import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OfferDto } from './dto/offer.dto';

@Injectable()
export class OfferService {
    constructor(private prisma: PrismaService) {}

    async create(dto: OfferDto) {
        const oldOffer = await this.prisma.offer.findUnique({
            where: {
                day: dto.day,
            }
        })

        if (oldOffer) throw new BadRequestException('Offer already in use')

        const offer = await this.prisma.offer.create({
            data: {
                ...dto
            },

            include: {
                sneaker: true
            }
        })

        return offer
    }

    async getAll() {
        const offer = await this.prisma.offer.findMany({
            include: {
                sneaker: true
            }
        })

        return offer
    }

    async getByIdorDayOrDiscount(discount: string) {
        const offer = await this.prisma.offer.findMany({
            where: {
                discount
            },

            include: {
                sneaker: true
            }
        })

        return offer
    }

    async updateDiscountByID(id: string, dto: OfferDto) {
        const offer = await this.prisma.offer.update({
            where: {
                id
            },

            data: {
                ...dto
            }
        })

        return offer
    }

    async deleteByDiscount(discount: string) {
        const deletedOffer = await this.prisma.offer.findUnique({
            where: {
                discount
            }
        })

        if (!deletedOffer) throw new BadRequestException('Offer not found')

        const offer = await this.prisma.offer.delete({
            where: {
                discount
            }
        })

        return {...offer, message: 'Offer deleted'}
    }
}
