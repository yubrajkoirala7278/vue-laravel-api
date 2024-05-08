const state = {
  color: "error",
  text: "",
  shown: false,
  timeout: 0,
  id: "",
  subText: "",
};

import { defineStore } from "pinia";

export const useSnackBarStore = defineStore("snackbar", {
  state: () => ({ ...state }),
  actions: {
    setMessage(data) {
      this.text = data.text;
      this.color = data.color;
      this.id = data.id;
      this.shown = true;
      this.subText = data.subText;
    },
    toggleMessage(data) {
      this.shown = data;
    },
  },
});
