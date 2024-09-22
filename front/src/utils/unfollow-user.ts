export async function unfollowUser(
  userId: number,
  accessToken: string
): Promise<void> {
  console.log("** userId =", userId);
  const response = await fetch("/api/follows", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      following: userId,
    }),
  });

  if (response.status !== 200) {
    throw new Error(`Error while following userId#${userId}`);
  }
}
