import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SneakersDto } from './dto/sneakers.dto'
import { FileService, FileType } from 'src/file/file.service'
import { OrderService } from 'src/order/order.service'

@Injectable()
export class SneakersService {
	constructor(
		private prisma: PrismaService,
		private fileService: FileService
	) {}

	async create(dto: SneakersDto, files) {
		const imagePath = this.fileService.createMoreFiles(FileType.SNEAKERS, files)
		const sneakers = await this.prisma.sneaker.create({
			data: {
				name: dto.name,
				brandName: dto.brandName,
				offerPrice: dto.offerPrice,
				price: dto.price,
				description: dto.description,
				image: {
					set: await imagePath
				},
				sizeNumber: dto.sizeNumber,
				size: {
					connect: {
						name: dto.sizeNumber
					}
				}
			},

			include: {
				brand: true,
				size: true,
				offer: true
			}
		})

		return sneakers
	}

	async getAll() {
		const sneakers = await this.prisma.sneaker.findMany({
			include: {
				brand: true,
				size: true,
				offer: true
			}
		})

		return sneakers
	}

	async getById(id: string) {
		const sneakers = await this.prisma.sneaker.findUnique({
			where: {
				id
			},

			include: {
				brand: true,
				size: true,
				offer: true
			}
		})

		return sneakers
	}

	async deleteById(id: string) {
		const sneakers = await this.prisma.sneaker.delete({
			where: {
				id
			}
		})

		return {
			...sneakers,
			message: 'Sneakers deleted'
		}
	}

	async updateFields(id: string, dto: SneakersDto, files) {
		const sneakers = await this.prisma.sneaker.update({
			where: {
				id: id
			},

			data: {
				...dto,
				image: files ? files : null
			}
		})

		return {
			...sneakers,
			message: 'Sneakers updated'
		}
	}

	async addImageToSneaker(sneakerId: string, files) {
		// const imagePath = this.fileService.createMoreFiles(FileType.SNEAKERS, files)

		const sneakers = await this.prisma.sneaker.update({
			where: {
				id: sneakerId
			},

			data: {
				image: {
					push: {
						// path: await imagePath
					}
				}
			}
		})

		return {
			...sneakers,
			message: 'Image added to sneaker'
		}
	}

	async removeSizeFromSneaker(sneakerId: string) {
		const size = await this.prisma.sneaker.update({
			where: {
				id: sneakerId
			},
			data: {
				size: {
					set: []
				}
			}
		})

		return {
			...size,
			message: 'Size removed from sneaker'
		}
	}
}
