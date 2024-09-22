export async function followUser(
  userId: number,
  accessToken: string
): Promise<void> {
  console.log("** userId =", userId);
  const response = await fetch("/api/follows", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      following: userId,
    }),
  });

  if (response.status !== 201) {
    throw new Error(`Error while following userId#${userId}`);
  }
}
