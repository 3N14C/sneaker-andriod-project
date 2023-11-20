import JsBarcode from 'jsbarcode'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './dto/order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async create(dto: OrderDto) {

		const order = await this.prisma.order.create({
			data: {
				...dto
			},

			include: {
				sneaker: {
					include: {
						size: true
					}
				}
			}
		})

		if (order) {
			const updateSneaker = await this.prisma.sneaker.update({
				where: {
					id: order.sneakerId
				},
				data: {
					soldCount: {
						set: order.sneaker.soldCount + 1
					}
				}
			})

			return updateSneaker
		}

		return order
	}

	async getOrders() {
		const orders = await this.prisma.order.findMany({
			include: {
				user: true,
				sneaker: {
					include: {
						size: true
					}
				}
			}
		})

		return orders
	}

	async getOrdersByUserId(userId: string) {
		const orders = await this.prisma.order.findMany({
			where: {
				userId
			},

			include: {
				sneaker: {
					include: {
						size: true
					}
				}
			}
		})

		return orders
	}

	async getOrderById(id: string) {
		const order = await this.prisma.order.findUnique({
			where: {
				id
			},

			include: {
				user: true,
				sneaker: {
					include: {
						size: true
					}
				}
			}
		})

		return order
	}

	async updateStatusOrderById(
		id: string,
		statusDelivery: string,
		statusDeliveryDescription: string
	) {
		const order = await this.prisma.order.update({
			where: {
				id
			},
			data: {
				statusDelivery,
				statusDeliveryDescription:
					statusDelivery === 'truck'
						? 'В пути'
						: statusDelivery === 'user-tie'
						? 'Передано курьеру'
						: statusDelivery === 'box-open'
						? 'Доставлено'
						: 'В процессе сборки'
			}
		})

		return order
	}

	async removeOrderById(id: string) {
		const order = await this.prisma.order.delete({
			where: {
				id
			}
		})

		return order
	}

	async removeOrderBySneakerId(sneakerId: string) {
		const order = await this.prisma.order.deleteMany({
			where: {
				sneakerId
			}
		})

		return order
	}
}
