"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH1 } from "@/components/ui/h1";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AccessTokenContext } from "../hoc/with-auth";

export default function Home() {
  const accessTokenContext = useContext(AccessTokenContext)!;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>();
  const router = useRouter();

  if (accessTokenContext.accessToken !== null) {
    router.push("/");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams({ email, password });
    const response = await fetch(`/api/auth/signIn?${params.toString()}`);

    if (response.status !== 200) {
      setAuthError("Invalid email or password");
      return;
    }

    const data = await response.json();

    localStorage.setItem("jwt", data.accessToken);
    router.push("/");
  }

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="flex justify-center content-center">
      <div>
        <TypographyH1 className="mb-5">On Art - Sign In</TypographyH1>

        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
          <div className="mb-5">
            <Label>Your email</Label>
            <Input
              onChange={onEmailChange}
              value={email}
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <Label>Your password</Label>
            <Input
              type="password"
              onChange={onPasswordChange}
              value={password}
              required
            />
          </div>
          <div className="mb-5">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
          <div>
            <span className="text-red-600">{authError}</span>
          </div>
        </form>
        <Separator className="mb-3" />
        <div className="text-center">
          Need an account ?{" "}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 hover:underline"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
