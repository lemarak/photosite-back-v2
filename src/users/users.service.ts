import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(createUserDto: CreateUserDto) {
    const slug = slugify(createUserDto.account.username);

    const createdUser = new this.userModel({
      ...createUserDto,
      'account.slug': slug,
    });
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findBySlug(slug: string) {
    return this.userModel.findOne({ 'account.slug': slug });
  }
}
