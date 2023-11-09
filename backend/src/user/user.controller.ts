import { FileService, FileType } from 'src/file/file.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Patch,
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { LoginDto } from './dto/login.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly FileService: FileService
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: 'avatar',
				maxCount: 1
			}
		])
	)
	create(@Body() dto: UserDto, @UploadedFiles() files?) {
		let avatarPath = null

		if (files && files.avatar) {
			avatarPath = this.FileService.createFile(FileType.USERS, files.avatar[0])
		}

		return this.userService.create(dto, avatarPath)
	}

	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.userService.login(dto)
	}

	@Get()
	getAll() {
		return this.userService.getAll()
	}

	@Get('username/:username')
	getByUsername(@Param('username') username: string) {
		return this.userService.getByName(username)
	}

	@Get('id/:id')
	getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@Get('email/:email')
	getByUserEmail(@Param('email') email: string) {
		return this.userService.getByEmail(email)
	}

	@Delete('delete/:id')
	deleteByUsername(@Param('id') id: string) {
		return this.userService.deleteById(id)
	}

	@Patch('update/:id')
	@UseInterceptors(
		FileFieldsInterceptor([
			{
				name: 'avatar',
				maxCount: 1
			}
		])
	)
	updateByUsername(
		@Param('id') id: string,
		@Body() dto: UserDto,
		@UploadedFiles() files?
	) {
		let avatarPath = null

		if (files && files.avatar) {
			avatarPath = this.FileService.createFile(FileType.USERS, files.avatar[0])
		}

		return this.userService.updateById(id, dto, avatarPath)
	}
}
