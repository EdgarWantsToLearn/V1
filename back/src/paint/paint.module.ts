import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Paint } from './paint.entity';
import { PaintRepository } from './paint.repository';
import { PaintController } from './paint.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Paint]),
    UserModule,
  ],
  providers: [PaintRepository],
  controllers: [PaintController],
  exports: [PaintRepository],
})
export class PaintModule {}
