import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<string> {
    let user = await this.userRepository.findOneByEmail(dto.email);
    const hashedPassword = await hash(
      dto.password,
      Number.parseInt(process.env.SALT_ROUNDS!, 10),
    );

    if (user !== null) {
      throw new ConflictException('Email already taken');
    }

    user = await this.userRepository.insertOne({
      ...dto,
      password: hashedPassword,
      paints: [],
      followers: [],
      followings: [],
    });

    return this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
  }

  async signIn(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (user === null || (await compare(password, user.password)) === false) {
      return null;
    }

    return this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
  }
}
