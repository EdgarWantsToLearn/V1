import { Paint } from "@/app/types/paint";

export async function updatePaintById(
  id: number,
  paint: Partial<Paint>,
  accessToken: string
) {
  const response = await fetch(`/api/paints/${id}`, {
    method: "PATCH",
    body: JSON.stringify(paint),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Error while patching paint#${id}`);
  }

  return response.json();
}
