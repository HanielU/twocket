<script lang="ts">
  import LoginBanner from "./components/LoginBanner.svelte";
  import { page } from "$app/stores";
</script>

<header class="app-header">
  <!-- user icon -->
  <div class="py-2.6 px-4 flex items-center">
    <div class="py-0.1 mr-4">
      <a href="/">
        <div class="i-ph-twitter-logo-fill text-(accent xl)" />
      </a>
    </div>

    <div>
      <h1 class="fw-semibold text-base">Home</h1>
    </div>
  </div>

  <div class="contents" class:hidden={/^\/(auth)?$/.test($page.url.pathname)}>
    <LoginBanner />
  </div>
</header>

<slot />

<footer
  class="app-footer"
  class:hidden={$page.url.pathname !== "/"}
  border-t="~ base-content/20"
>
  <LoginBanner />
</footer>
