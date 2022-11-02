<script lang="ts">
  import "../app.css";
  import "@unocss/reset/tailwind.css"; // https://github.com/unocss/unocss#style-resetting
  import "uno.css"; // https://github.com/unocss/unocss/tree/main/packages/vite#installation
</script>

<slot />

<svelte:head>
  <meta name="theme-color" content="#f1f7fd" />
  <title>Twitter Clone</title>
</svelte:head>
