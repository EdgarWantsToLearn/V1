"use client";
import { FunctionComponent } from "react";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH1 } from "@/components/ui/h1";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const SignUp: FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (password != confirmPassword) {
      setError("Password and confirm password are different");
      return;
    }

    const params = new URLSearchParams({ email, password });
    const response = await fetch(`/api/auth/signUp?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        username,
      }),
    });

    if (response.status !== 201) {
      if (response.status === 409) {
        setError("Email already exists");
      } else {
        setError("Error while sign up, try again");
      }

      return;
    }

    const data = await response.json();
    console.log("data =", data);

    localStorage.setItem("jwt", data.accessToken);
    router.push("/me");
  }

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function onConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  function onFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function onLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function onUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  return (
    <div className="grid place-items-center">
      <div>
        <TypographyH1 className="mb-5">On Art - Sign Up</TypographyH1>

        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
          <div className="mb-5">
            <Label>Email</Label>
            <Input
              onChange={onEmailChange}
              value={email}
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={onPasswordChange}
              value={password}
              required
            />
          </div>
          <div className="mb-5">
            <Label>Confirm password</Label>
            <Input
              type="password"
              onChange={onConfirmPasswordChange}
              value={confirmPassword}
              required
            />
          </div>
          <div className="mb-5">
            <Label>First name</Label>
            <Input
              onChange={onFirstNameChange}
              value={firstName}
              type="text"
              placeholder="Jane"
              required
            />
          </div>
          <div className="mb-5">
            <Label>Last name</Label>
            <Input
              onChange={onLastNameChange}
              value={lastName}
              type="text"
              placeholder="Doe"
              required
            />
          </div>
          <div className="mb-5">
            <Label>Username</Label>
            <Input
              onChange={onUsernameChange}
              value={username}
              type="text"
              placeholder="JaneDoe12"
              required
            />
          </div>
          <div className="mb-5">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          {error && (
            <div className="text-center mb-5">
              <span className="text-red-600">{error}</span>
            </div>
          )}
        </form>
        <Separator className="mb-3" />
        <div className="text-center">
          Already have an account ?{" "}
          <Link
            href="/sign-in"
            className="text-primary underline-offset-4 hover:underline"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
