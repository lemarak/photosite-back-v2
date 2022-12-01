import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class Account {
  @Prop()
  username: string;
  @Prop()
  slug: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  city: string;
  @Prop()
  phone: string;
}

@Schema()
export class User {
  @Prop()
  email: String;

  @Prop({ type: Account })
  account: Account;

  @Prop()
  token: String;

  @Prop()
  hash: String;

  @Prop()
  salt: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
