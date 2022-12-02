import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.signup(body);
    return user;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<CreateUserDto> {
    return req.user._doc;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.usersService.findBySlug(slug);
  }
}
