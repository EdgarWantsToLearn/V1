import { User } from "@/app/types/user";

export async function getUserById(
  id: number | string,
  accessToken: string
): Promise<User | null> {
  const response = await fetch(`/api/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  switch (response.status) {
    case 200:
      return response.json();
    case 404:
      return null;
    default:
      throw new Error(`Error while fetching user#${id}`);
  }
}
