import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { LoginDto } from './dto/login.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private fileService: FileService
	) {}

	async create(dto: UserDto, avatarPath?) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				username: dto.username,
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('User already in use')

		// const avatarPath = this.fileService.createFile(FileType.USERS, files)
		const user = await this.prisma.user.create({
			data: {
				...dto,
				avatar: avatarPath ? avatarPath : null
			},

			include: {
				orders: true
			}
		})

		return { ...user, avatar: avatarPath }
	}

	async login(dto: LoginDto) {
		const currentUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			},

			include: {
				orders: true
			}
		})

		if (!currentUser) throw new BadRequestException('User not found')

		if (currentUser.email !== dto.email)
			throw new BadRequestException('Email is not correct')

		if (currentUser.password !== dto.password)
			throw new BadRequestException('Password is not correct')

		if (
			currentUser.password === dto.password &&
			currentUser.email === dto.email
		) {
			const user = await this.prisma.user.update({
				where: {
					email: dto.email
				},

				data: {
					auth: true
				}
			})

			return user
		}
	}

	async getAll() {
		const user = this.prisma.user.findMany({
			include: {
				orders: true
			}
		})

		return user
	}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},

			include: {
				orders: true
			}
		})

		if (!user) throw new BadRequestException('Пользователь не найден')

		return user
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			},

			include: {
				orders: true
			}
		})

		if (!user) throw new BadRequestException('Пользователь не найден')

		return user
	}

	async getByName(username: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username
			},

			include: {
				orders: true
			}
		})

		if (!user) throw new BadRequestException('Пользователь не найден')

		return user
	}

	async deleteById(id: string) {
		const user = await this.prisma.user.delete({
			where: {
				id
			},

			include: {
				orders: true
			}
		})

		return {
			...user,
			message: 'User deleted'
		}
	}

	async updateById(id: string, dto: UserDto, avatarPath?) {
		const user = await this.prisma.user.update({
			where: {
				id
			},
			data: {
				...dto,
				avatar: avatarPath ? avatarPath : null
			},

			include: {
				orders: true
			}
		})

		return {
			...user,
			message: 'User updated'
		}
	}
}
