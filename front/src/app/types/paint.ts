import { User } from "./user";

export interface Paint {
  id: number;

  user: User;

  name: string;
  description: string;
  startPrice: number;
  endBid: string;

  image: any;
}
