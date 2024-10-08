import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {}
