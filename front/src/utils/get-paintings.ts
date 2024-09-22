import { Paint } from "@/app/types/paint";

export async function getPaintings(
  accessToken: string,
  paintIds?: string[]
) {
  let url = "/api/paints"
  
  if (paintIds) {
    const params = new URLSearchParams({ id: paintIds.join(",") });
    url += `?${params}`
  }

  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Error while fetching paints");
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
