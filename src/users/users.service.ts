import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt as _scrypt } from 'crypto';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, email } = createUserDto;
    const slug = slugify(username);

    const user = await this.findByCreds(username, email, slug);
    if (user) {
      throw new BadRequestException('email or username in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    const encryptedPassword = salt + '.' + hash.toString('hex');

    const createdUser = new this.userModel({
      ...createUserDto,
      password: encryptedPassword,
      slug,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userModel.find();
  }

  async findByUsername(username: string): Promise<CreateUserDto | undefined> {
    return this.userModel.findOne({ username });
  }

  async findBySlug(slug: string): Promise<User | undefined> {
    return this.userModel.findOne({ slug });
  }

  async findByCreds(username, email, slug): Promise<User | undefined> {
    return this.userModel.findOne().or([{ username }, { slug }, { email }]);
  }
}
