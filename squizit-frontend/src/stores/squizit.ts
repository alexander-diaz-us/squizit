import { defineStore } from "pinia";
import { SquizitInfo } from "../assets/types";

export const useSquizitStore = defineStore({
  id: "squizitStore",
  state: () => ({
    websiteInfo: {
      ads: [],
      info: "",
      address: [],
      donates: {
        donators: [],
        amount: 0,
        target: 0,
      },
    } as SquizitInfo,
  }),
});
