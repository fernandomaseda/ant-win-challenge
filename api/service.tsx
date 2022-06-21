import type { NextApiRequest, NextApiResponse } from "next";
import { ListAnts, ResponseListAnts } from "../libs/types";

const fetcher = {
  list: async (): Promise<ResponseListAnts> => {
    try {
      const url = "https://sg-ants-server.herokuapp.com/ants";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        ReferrerPolicy: "strict-origin-when-cross-origin",
        Cache: "no-cache",
      };
      const res = await fetch(url, { ...options });
      if (res.ok) {
        return res.json().then((data) => {
          return { action: 1, data: data };
        });
      }
      throw new Error("Something went wrong.");
    } catch (error) {
      console.log("Request failed", error);
      return { action: 2, data: null };
    }
  },
};
export default fetcher;
