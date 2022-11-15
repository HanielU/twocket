<script lang="ts">
  import "../app.css";
  import "@unocss/reset/tailwind.css"; // https://github.com/unocss/unocss#style-resetting
  import "uno.css"; // https://github.com/unocss/unocss/tree/main/packages/vite#installation
  import type { PageData } from "./$types";
  import SignedOut from "./layouts/SignedOut.svelte";
  import SignedIn from "./layouts/SignedIn.svelte";

  export let data: PageData;
</script>

{#if data.user}
  <SignedIn>
    <slot />
  </SignedIn>
{:else}
  <SignedOut>
    <slot />
  </SignedOut>
{/if}

<svelte:head>
  <meta name="theme-color" content="#f1f7fd" />
  <title>Twitter Clone</title>
</svelte:head>
