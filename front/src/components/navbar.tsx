"use client";

import React, { useContext } from "react";
import { Button } from "./ui/button";
import { useMe } from "@/app/hooks/use-me";
import { useRouter } from "next/navigation";
import { AccessTokenContext } from "@/app/hoc/with-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { me } = useMe();
  const context = useContext(AccessTokenContext)!;
  const router = useRouter();

  function handleHome() {
    router.push("/");
  }

  function handleDisc() {
    context.removeAccessToken();
    router.push("/sign-in");
  }

  function handleProfile() {
    router.push("/me");
  }

  function handleMyPaintings() {
    router.push(`/users/${me!.id}`);
  }

  function handlePublishPainting() {
    router.push('/publish-painting');
  }

  function handleFollowers() {
    router.push(`/users/${me!.id}/followers`);
  }

  return (
    <>
      <div className="w-full h-10 bg-black sticky">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <Button
                variant="link"
                className="text-white"
                onClick={handleHome}
              >
                On Art
              </Button>
            </div>
            {context?.accessToken && (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white">
                  Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleProfile}>
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handlePublishPainting}>
                    Publish Painting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleMyPaintings}>
                    My Paintings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleFollowers}>
                    Followers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDisc}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
