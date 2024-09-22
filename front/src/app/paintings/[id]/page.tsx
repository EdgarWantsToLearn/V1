"use client";

import { AccessTokenContext, WithAuth } from "@/app/hoc/with-auth";
import { Paint } from "@/app/types/paint";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPaintings } from "@/utils/get-paintings";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useMe } from "@/app/hooks/use-me";
import { updatePaintById } from "@/utils/update-paint-by-id";
import { uploadNewPaintImage } from "@/utils/upload-new-paint-image";

interface PaintInfoProps {
  params: { id: string };
}

export const PaintInfoComponent = ({ params }: PaintInfoProps) => {
  const { me } = useMe();
  const { accessToken } = useContext(AccessTokenContext)!;
  const [paint, setPaint] = useState<Paint | null>(null);
  const [allowEdit, setAllowEdit] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  useEffect(() => {
    console.log(me?.id, paint?.user.id);
    setAllowEdit(me !== null && paint !== null && me.id === paint?.user.id);
  }, [me, paint]);

  useEffect(() => {
    async function fn() {
      const paints = await getPaintings(accessToken!, [params.id]);

      if (paints.length === 0) {
        router.push("/404");
        return;
      }

      console.log("paints =", paints);

      setPaint(paints[0]);
    }

    fn();
  }, [accessToken]);

  if (!paint || !me) {
    return <Loading />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPaint((prev) => (prev === null ? prev : { ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitIsLoading(true);

    await updatePaintById(
      paint.id,
      { description: paint.description, name: paint.name },
      accessToken!
    );

    if (newImage !== null) {
      await uploadNewPaintImage(paint.id, newImage, accessToken!);
    }

    setSubmitIsLoading(false);
  };

  const handleArtist = () => {
    console.log(paint);
    router.push(`/users/${paint.user.id}`);
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
              src={previewImage || paint.image}
              alt={paint.name}
              className="max-w-full h-auto rounded-lg shadow-lg"
              onClick={allowEdit ? triggerFileInput : undefined}
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
            <div>
              <span>Artist: </span>
              <Button variant="link" onClick={handleArtist}>
                {paint.user.username}
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={paint.name}
                  onChange={handleChange}
                  readOnly={!allowEdit}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startPrice">Start Price</Label>
                <Input
                  id="startPrice"
                  name="startPrice"
                  type="number"
                  value={paint.startPrice}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={paint.description ?? ""}
                  onChange={handleChange}
                  readOnly={!allowEdit}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endOfBid">End of Bid</Label>
                <Input
                  id="endOfBid"
                  name="endOfBid"
                  value={paint.endBid}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestBid">Best Bid</Label>
                <Input
                  id="bestBid"
                  name="bestBid"
                  type="number"
                  value={"paint.bestBid"}
                  readOnly
                />
              </div>
              {allowEdit && (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitIsLoading}
                >
                  Update Paint Info
                </Button>
              )}
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithAuth(PaintInfoComponent);
