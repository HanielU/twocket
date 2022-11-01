<script lang="ts">
  import Header from "./components/navigation/Header.svelte";
  import MobileFooter from "./components/navigation/MobileFooter.svelte";
</script>

<Header />

<slot />

<MobileFooter />

<svelte:head>
  <meta name="theme-color" content="#f1f7fd" />
  <title>Twitter Clone</title>
</svelte:head>
