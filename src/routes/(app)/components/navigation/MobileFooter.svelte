<script lang="ts">
  import { clsx } from "clsx";
  import { page } from "$app/stores";

  type FooterLink = {
    path: string;
    classes: {
      line: string;
      fill: string;
      wrapper?: string;
    };
  };

  const links: FooterLink[] = [
    {
      path: "/",
      classes: {
        line: "i-ri-home-8-line",
        fill: "i-ri-home-8-fill text-primary",
      },
    },
    {
      path: "/explore",
      classes: {
        line: "i-ri-search-2-line",
        fill: "i-ri-search-2-fill",
      },
    },
    {
      path: "/notifications",
      classes: {
        line: "i-ri-notification-3-line",
        fill: "i-ri-notification-3-fill",
      },
    },
  ];
</script>

<footer class="app-footer">
  <div class="flex justify-between border-t">
    {#each links as { path, classes }}
      {@const currentPathActive = $page.url.pathname === path}

      <div class="py-2.9 mx-auto relative">
        <div
          class={clsx(
            "text-5.5",
            currentPathActive ? classes.fill : classes.line
          )}
        />
      </div>
    {/each}
  </div>
</footer>
