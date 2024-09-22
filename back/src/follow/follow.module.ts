import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Follow } from './follow.entity';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { FollowService } from './follow.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Follow]),
    UserModule,
  ],
  providers: [FollowRepository, FollowService],
  controllers: [FollowController],
  exports: [FollowRepository, FollowService],
})
export class FollowModule {}
