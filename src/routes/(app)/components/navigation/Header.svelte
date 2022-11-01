<script lang="ts">
  import { pageHeader } from "$styles/Header.css";
</script>

<header class={pageHeader}>
  <!-- user icon -->
  <div class="py-2.6 px-4 flex items-center">
    <div class="h-8 rounded-full overflow-hidden mr-4">
      <img class="h-full" src="/myavatar.png" alt="Profile" />
    </div>

    <div>
      <h1 class="fw-semibold text-base">Home</h1>
    </div>
  </div>
</header>
