<script lang="ts">
  const linkStyle =
    "p-1.5 border rounded-full transition active:scale-90 flex-1 text-center max-w-20ch";
</script>

<div class="w-full flex justify-evenly py-2 px-4 gap-2">
  <a
    class="{linkStyle} bg-accent-focus/10 border-base-content/20"
    href="/auth?q=login"
  >
    Log In
  </a>

  <a
    class="{linkStyle} bg-primary-focus text-primary-content font-semibold"
    href="/auth?q=signup"
  >
    Sign Up
  </a>
</div>
