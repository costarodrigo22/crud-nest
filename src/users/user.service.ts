import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/schemas/user.schema';
import { FindOneOptions, Repository } from 'typeorm';
import { UserModel } from './User.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async store(data: UserSchema) {
    const user = this.userRepository.create(data);

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
  }

  async findOneOrFail(options?: FindOneOptions<UserModel>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: UserSchema) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    this.userRepository.merge(user, data);

    return await this.userRepository.save(user);
  }

  async destroy(id: number) {
    await this.userRepository.findOneOrFail({ where: { id } });

    this.userRepository.softDelete({ id });
  }
}
