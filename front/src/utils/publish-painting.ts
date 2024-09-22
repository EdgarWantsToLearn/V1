import { Paint } from "@/app/types/paint";

export async function publishPainting(
  paint: Omit<Paint, "id" | "user">,
  accessToken: string
): Promise<Paint> {
  const response = await fetch(`/api/paints`, {
    method: "POST",
    body: JSON.stringify(paint),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error(`Error while publishing painting`);
  }

  return response.json();
}
