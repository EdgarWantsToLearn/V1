import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Post,
  Query,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/user/user.entity';

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  @HttpCode(201)
  async signUp(@Body() body: CreateUserDto): Promise<{ accessToken: string }> {
    const accessToken = await this.userService.signUp(body);
    return { accessToken };
  }

  @Get('/SignIn')
  async signIn(@Query() query: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = query;
    const jwtToken = await this.userService.signIn(email, password);

    if (jwtToken === null) {
      throw new UnauthorizedException();
    }

    return { accessToken: jwtToken };
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Request() req: Request): Promise<Omit<User, 'password'>> {
    const user = (req as any).user;

    delete user.password;

    return user;
  }
}
