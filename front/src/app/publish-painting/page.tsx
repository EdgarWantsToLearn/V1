"use client";

import { AccessTokenContext, WithAuth } from "@/app/hoc/with-auth";
import { Paint } from "@/app/types/paint";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useMe } from "@/app/hooks/use-me";
import { updatePaintById } from "@/utils/update-paint-by-id";
import { uploadNewPaintImage } from "@/utils/upload-new-paint-image";
import { publishPainting } from "@/utils/publish-painting";

interface PublishPaintingProps {
}

export const PublishPainting = ({}: PublishPaintingProps) => {
  const { me } = useMe();
  const { accessToken } = useContext(AccessTokenContext)!;
  const [painting, setPainting] = useState<Omit<Paint, "id" | "user">>({description: '', endBid: '', image: 'default.png', name: '', startPrice: 2});
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!me) {
    return <Loading />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value)
    setPainting((prev) => (prev === null ? prev : { ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitIsLoading(true);

    // await updatePaintById(
    //   paint.id,
    //   { description: paint.description, name: paint.name },
    //   accessToken!
    // );

    try {
      const {id} = await publishPainting(painting, accessToken!)
      console.log("id =", id)

      if (newImage !== null) {
        await uploadNewPaintImage(id, newImage, accessToken!);
      }
      router.push(`/paintings/${id}`)
    } catch {
      setError("Invalid value")
    } finally {
      setSubmitIsLoading(false)

    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              src={previewImage || painting.image}
              alt={painting.name}
              className="max-w-full h-auto rounded-lg shadow-lg"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png"
              onChange={handleImageChange}
              aria-hidden="true"
            />
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  id="name"
                  name="name"
                  value={painting.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startPrice">Start Price</Label>
                <Input
                  required
                  id="startPrice"
                  name="startPrice"
                  type="number"
                  value={painting.startPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  required
                  id="description"
                  name="description"
                  value={painting.description ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endBid">End of Bid</Label>
                <Input
                  required
                  id="endBid"
                  name="endBid"
                  value={painting.endBid}
                  onChange={handleChange}
                />
              </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitIsLoading}
                >
                  Publish
                </Button>
                {error && <span className="text-red-600">{error}</span>}
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithAuth(PublishPainting);
