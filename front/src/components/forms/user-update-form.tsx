"use client";

import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "../loading";
import { Separator } from "../ui/separator";
import { User } from "@/app/types/user";

const UserUpdateForm: FunctionComponent<{
  user: User | null;
  isLoading: boolean;
}> = ({ isLoading, ...props }) => {
  const [user, setUser] = useState(props.user);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (isLoading == false && props.user) {
      setUser(props.user);
    }
  }, [isLoading, props.user]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    setError(undefined);
    setMessage(undefined);

    const response = await fetch(`/api/users/${user!.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status !== 200) {
      setError("Error while updating user, try again please");
    } else {
      setMessage("User update succeed");
    }
  }

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user!, email: event.target.value });
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user!, password: event.target.value });
  }

  function onFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user!, firstName: event.target.value });
  }

  function onlastNameChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user!, lastName: event.target.value });
  }

  if (isLoading || !user) {
    return (
      <div className="grid place-items-center h-screen">
        <Card className="flex flex-col justify-between p-8">
          <Loading />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="flex flex-col justify-between p-8">
        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
          <div className="mb-5">
            <Label>Email*</Label>
            <Input
              onChange={onEmailChange}
              value={user.email}
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <Label>Firs name*</Label>
            <Input
              type="text"
              onChange={onFirstNameChange}
              value={user.firstName}
              required
            />
          </div>
          <div className="mb-5">
            <Label>Last name*</Label>
            <Input
              type="text"
              onChange={onlastNameChange}
              value={user.lastName}
              required
            />
          </div>
          <div className="mb-5">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={onPasswordChange}
              value={user.password}
            />
          </div>
          <Separator className="my-4" orientation="horizontal" />
          <div>
            <Button type="submit" className="w-full">
              Update
            </Button>
          </div>
          {error}
          {message}
        </form>
      </Card>
    </div>
  );
};

export default UserUpdateForm;
