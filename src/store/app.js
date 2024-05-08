// Utilities
import { defineStore } from "pinia";
import { useAuthStore } from "@/modules/login/store";
import { useSnackBarStore } from "./snackbar";
import { useHomePageStore } from "@/modules/home/store";

export const useAppStore = defineStore("app", () => {
  const auth = useAuthStore();
  const snackbar = useSnackBarStore();
  const home = useHomePageStore();

  return {
    auth,
    snackbar,
    home,
  };
});
