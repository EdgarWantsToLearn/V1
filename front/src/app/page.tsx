"use client";

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { AccessTokenContext, WithAuth } from "./hoc/with-auth";
import PaintingsTable from "@/components/paintings-table";
import { getPaintings } from "@/utils/get-paintings";
import { Paint } from "./types/paint";

const Home: FunctionComponent = () => {
  const {accessToken} = useContext(AccessTokenContext)!
  const [paintings, setPaintings] = useState<Paint[]>([])

  useEffect(() => {
    async function get() {
      if (accessToken) {
        const paintings = await getPaintings(accessToken)
        console.log("paintings", paintings)
        setPaintings(paintings)
      }
    }

    get()

  }, [accessToken])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        All paintings
      </h1>
      <PaintingsTable paintings={paintings}/>
    </div>
  );
};

export default WithAuth(Home);
