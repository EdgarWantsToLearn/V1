export async function uploadNewPaintImage(
  id: number,
  file: File,
  accessToken: string
): Promise<void> {
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(`/api/paints/${id}/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

  if (response.status !== 201) {
    throw new Error(`Error while uploading new image for paint#${id}`);
  }
}
