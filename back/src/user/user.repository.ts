import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  insertOne(user: Omit<User, 'id'>): Promise<User> {
    return this.repository.save(user);
  }

  findOneByEmail(email: User['email']): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  findOneBy(user: Partial<User>): Promise<User | null> {
    return this.repository.findOneBy(user);
  }

  async updateById(id: number, user: Partial<User>): Promise<User | null> {
    await this.repository.update({ id }, user);
    return this.findOneBy({ id });
  }
}
