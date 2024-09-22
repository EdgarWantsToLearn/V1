import { User } from "@/app/types/user";

export async function getFollowers(
  userId: number,
  accessToken: string
): Promise<User[]> {
  const response = await fetch(`/api/follows/followers/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status !== 200) {
    throw new Error("Error while getting follows");
  }

  const followers = await response.json();

  return followers.map((f: any) => f.following);
}
