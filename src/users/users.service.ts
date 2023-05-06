import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(createUserInput);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
