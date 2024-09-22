import { Paint } from "@/app/types/paint";

export async function getPaintingsByUserIds(
  userId: number,
  accessToken: string
): Promise<Paint[]> {
  const query = new URLSearchParams({ userId: userId.toLocaleString() });

  let response = await fetch(`/api/paints?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Error while fetching paintings by user");
  }
  const paints: Paint[] = await response.json();

  const promises = paints.map((p) =>
    fetch(`/api/paints/${p.id}/image`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
  const responses = await Promise.all(promises);
  const images = await Promise.all(responses.map((r) => r.blob()));

  return paints.map((p, index) => ({
    ...p,
    image: URL.createObjectURL(images[index]),
  }));
}
