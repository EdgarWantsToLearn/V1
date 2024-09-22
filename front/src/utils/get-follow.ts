import { Follow } from "@/app/types/follow";

export async function getFollow(
  follower: number,
  following: number,
  accessToken: string
): Promise<Follow | null> {
  const query = new URLSearchParams({
    follower: follower.toLocaleString(),
    following: following.toLocaleString(),
  });

  console.log("url = ", `api/follows?${query}`);
  const response = await fetch(`/api/follows?${query}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status !== 200) {
    throw new Error("Error while getting follows");
  }

  const follows = await response.json();
  const [follow] = follows;

  return follow ?? null;
}
