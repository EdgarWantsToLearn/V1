import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { GetFollowersByUserIdDtoParams } from './dto/get-followers-by-user-id-params.dto';
import { Follow } from './follow.entity';
import { FollowRepository } from './follow.repository';
import { GetFollowingsByUserIdDtoParams } from './dto/get-followings-by-user-id-params.dto';
import { CreateFollowBodyDto } from './dto/create-follow-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteFollowBodyDto } from './dto/delete-follow-body.dto';
import { FollowService } from './follow.service';
import { GetFollowsQueryDto } from './dto/get-follow-query.dto';

@Controller('follows')
export class FollowController {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly followService: FollowService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async get(@Query() query: GetFollowsQueryDto): Promise<Follow[]> {
    return this.followRepository.find(query);
  }

  @UseGuards(AuthGuard)
  @Get('followers/:userId')
  async getFollowersByUserId(
    @Param() params: GetFollowersByUserIdDtoParams,
  ): Promise<Follow[]> {
    const { userId } = params;

    return this.followRepository.find({ following: userId }, true);
  }

  @UseGuards(AuthGuard)
  @Get('followings')
  async getFollowingsByUserId(
    @Param() params: GetFollowingsByUserIdDtoParams,
  ): Promise<Follow[]> {
    const { userId } = params;

    return this.followRepository.find({ follower: userId });
  }

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async createFollow(@Body() body: CreateFollowBodyDto, @Request() req: any) {
    return this.followRepository.insertOne({
      follower: req.user.id,
      following: body.following,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteFollow(
    @Body() body: DeleteFollowBodyDto,
    @Request() req: any,
  ): Promise<void> {
    this.followService.deleteFollow(req.user.id, body.following);
  }
}
