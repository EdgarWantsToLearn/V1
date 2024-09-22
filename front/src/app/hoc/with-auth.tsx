"use client";

import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

// Define the shape of our context
interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
}

// Create the context
export const AccessTokenContext = createContext<
  AccessTokenContextType | undefined
>(undefined);

// Create a provider component
export function AccessTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  function removeAccessToken() {
    localStorage.removeItem("jwt");
    setAccessToken(null);
  }

  return (
    <AccessTokenContext.Provider
      value={{ accessToken, setAccessToken, removeAccessToken }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
}

export function WithAuth(Component: any) {
  const AuthenticatedComponent = (props = {}) => {
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
    const accessTokenContext = useContext(AccessTokenContext)!;

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");

      if (jwt === null) {
        accessTokenContext.removeAccessToken();
        return redirect("/sign-in");
      }

      setisAuthenticated(true);
      accessTokenContext.setAccessToken(jwt);
    }, []);

    return isAuthenticated === true ? <Component {...props} /> : <></>;
  };

  return AuthenticatedComponent;
}
