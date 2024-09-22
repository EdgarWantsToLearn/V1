import { InjectRepository } from '@nestjs/typeorm';
import { Paint } from './paint.entity';
import { Repository } from 'typeorm';

export class PaintRepository {
  constructor(
    @InjectRepository(Paint)
    private repository: Repository<Paint>,
  ) {}

  insertOne(paint: Omit<Paint, 'id'>): Promise<Paint> {
    return this.repository.save(paint);
  }

  async find({
    id,
    userId,
  }: {
    id?: number;
    userId?: number;
  }): Promise<Paint[]> {
    const paints = await this.repository.find({
      where: { id, user: { id: userId } },
      relations: { user: true },
    });

    return paints.map((p) => {
      // @ts-expect-error password must be removed
      delete p.user.password;

      return p;
    });
  }

  async updateById(id: number, paint: Partial<Paint>): Promise<Paint | null> {
    await this.repository.update({ id }, paint);

    return this.repository.findOne({ where: { id } });
  }
}
