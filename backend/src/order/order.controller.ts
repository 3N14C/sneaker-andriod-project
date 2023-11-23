import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto } from './dto/order.dto'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('create')
	create(@Body() dto: OrderDto) {
		return this.orderService.create(dto)
	}

	@Get()
	getOrders() {
		return this.orderService.getOrders()
	}

	@Get('user-orders/:userId')
	getOrdersByUserId(@Param('userId') userId: string) {
		return this.orderService.getOrdersByUserId(userId)
	}

	@Get('order-by-id/:id')
	getOrderById(@Param('id') id: string) {
		return this.orderService.getOrderById(id)
	}

	@Patch('update-status-order-by-id/:id')
	updateStatusOrderById(@Param('id') id: string, @Body() dto: OrderDto) {
		return this.orderService.updateStatusOrderById(id, dto)
	}

	@Patch('delete-order-status-by-id/:id')
	deleteOrderStatusById(@Param('id') id: string, @Body() dto: OrderDto) {
		return this.orderService.deleteOrderStatusById(id, dto)
	}

	@Delete('delete-order-by-id/:id')
	removeOrderById(@Param('id') id: string) {
		return this.orderService.removeOrderById(id)
	}

	@Delete('delete-order-by-sneaker-id/:sneakerId')
	removeOrderBySneakerId(@Param('sneakerId') sneakerId: string) {
		return this.orderService.removeOrderBySneakerId(sneakerId)
	}
}
