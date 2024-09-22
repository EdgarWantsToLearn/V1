"use client";

import { useEffect, useState } from "react";
import { User } from "../types/user";

export function useMe() {
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await response.json();

      if (response.status !== 200) {
        setError("Can't fetch me");
      } else {
        setMe(data);
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { me, isLoading, error, setMe };
}
