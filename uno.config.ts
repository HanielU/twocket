// https://github.com/unocss/unocss/tree/main/packages/vite
// https://github.com/unocss/unocss/tree/main/packages/vite#svelte
// https://github.com/unocss/unocss/tree/main/packages/preset-uno
// https://github.com/unocss/unocss/tree/main/packages/preset-attributify
// https://github.com/unocss/unocss/tree/main/packages/preset-icons
// https://github.com/unocss/unocss/tree/main/packages/transformer-directives
// https://github.com/unocss/unocss/tree/main/packages/transformer-variant-group

import {
  defineConfig,
  extractorSvelte,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// https://github.com/unocss/unocss#configurations
export default defineConfig({
  extractors: [extractorSvelte],

  // includes only (svelte or .css.ts (vanilla-extract)) files in a src folder
  include: [/.*\/src\/.+\.svelte$/],

  // https://github.com/unocss/unocss#extend-theme
  theme: {
    colors: {
      base: {
        100: "hsl(0, 0%, 100%)",
        200: "hsl(213, 85%, 97%)",
        content: {
          DEFAULT: "hsl(220, 2%, 28%)",
          muted: "hsl(207, 19%, 70%)",
        },
      },
      primary: {
        DEFAULT: "hsl(352, 100%, 66%)",
        focus: "hsl(356, 100%, 64%)",
        content: "hsl(213, 85%, 97%)",
      },
      accent: {
        DEFAULT: "hsl(182, 100%, 61%)",
        focus: "hsl(188, 100%, 56%)", // darker shade
        content: "white",
      },
    },
  },

  // https://github.com/unocss/unocss#custom-rules
  rules: [],

  // https://github.com/unocss/unocss#shortcuts
  shortcuts: [
    {
      "app-header":
        "bg-base-200/10 sticky top-0 backdrop-blur-8px mb-5 z-9999 [box-shadow:0_-8px_30px_rgba(0,_0,_0,_0.1)]",
      "app-footer": "fixed bottom-0 left-0 w-full bg-base-200",
    },
    [
      // flex-u stands for flex-utility
      // to avoid mixups with default flex utilities like flex-wrap
      /^flex-u-([a-z]+)-?([a-z]*)$/,
      ([, justify, align]) =>
        `flex justify-${justify} items-${align || "center"}`,
    ],
    // use when width and height values are the same
    [/^square-(.*)$/, ([, v]) => `h-${v} w-${v}`],
  ],

  // https://github.com/unocss/unocss#using-presets
  presets: [presetUno(), presetIcons({ scale: 1.2 }), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
