import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { UpdateUserParamsDto } from './dto/update-user-params.dto';
import { UpdateUserbodyDto as UpdateUserBodyDto } from './dto/update-user-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async userById(
    @Param() params: GetUserByIdDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id: params.id });

    if (user === null) {
      throw new NotFoundException(`User#${params.id} not found`);
    }

    // @ts-expect-error password must ne deleted
    delete user.password;

    return user;
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateUser(
    @Param() params: UpdateUserParamsDto,
    @Body() body: UpdateUserBodyDto,
    @Request() req: any,
  ): Promise<Omit<User, 'password'>> {
    const currentUser: User = req.user;

    if (currentUser.id !== params.id) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.updateById(params.id, body);

    if (user === null) {
      throw new NotFoundException(`User#${params.id} not found`);
    }

    // @ts-expect-error password must ne deleted
    delete user.password;

    return user;
  }
}
