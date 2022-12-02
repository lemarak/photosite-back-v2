import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  // @Post('/login')
  // @UseGuards(LocalAuthGuard)
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.usersService.findBySlug(slug);
  }
}
