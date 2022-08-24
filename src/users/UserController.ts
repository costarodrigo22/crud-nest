import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('/users')
@ApiTags('Users Routes')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Post('/create')
  async store(@Body() body: UserSchema) {
    return await this.userService.store(body);
  }
}
