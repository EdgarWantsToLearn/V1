"use client";

import { FunctionComponent } from "react";
import { WithAuth } from "../hoc/with-auth";
import UserUpdateForm from "@/components/forms/user-update-form";
import { useMe } from "../hooks/use-me";

const Me: FunctionComponent = () => {
  const { me, isLoading } = useMe();

  return <UserUpdateForm user={me!} isLoading={isLoading} />;
};

export default WithAuth(Me);
