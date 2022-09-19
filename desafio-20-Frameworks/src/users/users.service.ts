import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { encrypt } from '../utils/passwordEncrypt.util';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }
  async register(email: string, password: string): Promise<User> {
    const hashedPassword: string = encrypt(password);
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
}
