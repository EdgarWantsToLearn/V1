import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Paint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'numeric' })
  startPrice: number;

  @Column({ type: 'timestamptz' })
  endBid: Date;

  @ManyToOne(() => User, (user) => user.paints)
  user: User;
}
