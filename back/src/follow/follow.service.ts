import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async deleteFollow(follower: number, following: number) {
    const follows = await this.followRepository.find({ follower, following });
    const [follow] = follows;

    if (follow == null) {
      return;
    }

    await this.followRepository.deleteOneById(follow.id);
  }
}
