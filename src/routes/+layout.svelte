<script lang="ts">
  import "../app.css";
  import "@unocss/reset/tailwind.css"; // https://github.com/unocss/unocss#style-resetting
  import "uno.css"; // https://github.com/unocss/unocss/tree/main/packages/vite#installation
  import type { PageData } from "./$types";
  import SignedInLayout from "./layouts/SignedIn.svelte";
  import SignedOutLayout from "./layouts/SignedOut.svelte";

  export let data: PageData;
</script>

{#if data.user}
  <SignedInLayout>
    <slot />
  </SignedInLayout>
{:else}
  <SignedOutLayout>
    <slot />
  </SignedOutLayout>
{/if}

<svelte:head>
  <meta name="theme-color" content="#f1f7fd" />
  <title>Twitter Clone</title>
</svelte:head>
