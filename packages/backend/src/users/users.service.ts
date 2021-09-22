import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async findById(id: number) {
    return this.usersRepository.findOne(id)
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username })

    return user
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)

    return this.usersRepository.save(user)
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
