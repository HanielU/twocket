import { style } from "@vanilla-extract/css";

export const pageHeader = style([
  "bg-base-200/10 sticky top-0 backdrop-blur-8px mb-5 z-9999",

  /* From https://css.glass */
  {
    boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.1)",
  },
]);
