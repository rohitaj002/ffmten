// src\route\api\v1\user\user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindOneOptions } from 'typeorm';
import { User } from 'src/constant/database/model/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    await this.findById(id); // Ensure the user exists
    await this.userRepository.update(id, updateUser);
    return this.findById(id);
  }

  async softDelete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Ensure the user exists
    return this.userRepository.softDelete(id);
  }

  async restoreSoftDelete(id: number): Promise<void> {
    const result = await this.userRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
