import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';

export class FollowRepository {
  constructor(
    @InjectRepository(Follow)
    private repository: Repository<Follow>,
  ) {}

  insertOne(follow: Omit<Follow, 'id'>): Promise<Follow> {
    return this.repository.save(follow);
  }

  async deleteOneById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async find(filter: Partial<Follow>, relation = false): Promise<Follow[]> {
    return this.repository.find({
      where: filter,
      //@ts-expect-error
      relations: { following: relation },
    });
  }

  async updateOneById(
    id: number,
    follow: Partial<Follow>,
  ): Promise<Follow | null> {
    await this.repository.update(id, follow);

    return this.repository.findOne({ where: { id } });
  }
}
