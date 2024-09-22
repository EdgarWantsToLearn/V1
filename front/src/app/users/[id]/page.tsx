"use client";

import { useContext, useEffect, useState } from "react";
import { AccessTokenContext, WithAuth } from "../../hoc/with-auth";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { Paint } from "@/app/types/paint";
import { getUserById } from "@/utils/get-user-by-id";
import { useMe } from "@/app/hooks/use-me";
import { User } from "@/app/types/user";
import { Button } from "@/components/ui/button";
import { getPaintingsByUserIds } from "@/utils/get-paintings-by-user-id";
import { getFollow } from "@/utils/get-follow";
import { followUser } from "@/utils/follow-user";
import { unfollowUser } from "@/utils/unfollow-user";
import PaintingsTable from "@/components/paintings-table";

const MyPaintings = ({ params }: { params: { id: string } }) => {
  const { me } = useMe();
  const { accessToken } = useContext(AccessTokenContext)!;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paints, setPaintings] = useState<Paint[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPaints() {
      if (!me || !accessToken) {
        return;
      }

      setIsLoading(true);
      const user = await getUserById(params.id, accessToken);

      if (user === null) {
        router.push("404");
        return;
      }
      const follow = await getFollow(me.id, user.id, accessToken);
      const paintings = await getPaintingsByUserIds(user.id, accessToken);

      setIsFollowing(follow !== null);
      setPaintings(paintings);
      setCurrentUser(user);
      setIsLoading(false);
    }

    fetchPaints().catch(() => {
      setError("Error while fetching");
      setIsLoading(false);
    });
  }, [accessToken, me]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (!me || !currentUser || !accessToken) {
    return <Loading />;
  }

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(currentUser.id, accessToken);
      setIsFollowing(false);
    } else {
      await followUser(currentUser.id, accessToken);
      setIsFollowing(true);
    }
  };

  const isMyProfile = me.id === currentUser.id;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {isMyProfile
              ? "My Paintings"
              : `${currentUser.username}'s paintings`}
          </h1>
        </div>
        <div>
          {!isMyProfile && (
            <Button onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>
      <PaintingsTable paintings={paints}/>
    </div>
  );
};

export default WithAuth(MyPaintings);
