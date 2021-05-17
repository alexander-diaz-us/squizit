import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settingsStore",
  state: () => ({
    forceShowingAnswers: false,
    darkMode: true,
  }),
});
