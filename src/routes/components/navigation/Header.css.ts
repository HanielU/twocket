import { style } from "@vanilla-extract/css";

export const pageHeader = style([
  "bg-base-200/10 flex sticky top-0 backdrop-blur-10px",

  /* From https://css.glass */
  {
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
]);
