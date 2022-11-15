<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<header class="app-header">
  <div class="py-2.6 px-4 flex-u-between">
    <div class="flex items-center">
      <!-- user icon -->
      <div class="h-8 rounded-full overflow-hidden mr-4">
        <img class="h-full" src="/myavatar.png" alt="Profile" />
      </div>

      <div>
        <h1 class="fw-semibold text-base">Home</h1>
      </div>
    </div>

    <div>
      <form method="post" action="/auth?/logout" use:enhance>
        <button class="px-2 py-1.5 bg-primary text-white rounded-lg text-sm">
          Logout
        </button>
      </form>
    </div>
  </div>
</header>
