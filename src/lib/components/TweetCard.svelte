<script lang="ts">
  // export let userName =

  type CardAction = {
    classes: {
      icon: string;
      wrapper: string;
    };
    value: number;
  };

  const cardActions: CardAction[] = [
    {
      classes: {
        icon: "i-system-uicons-retweet",
        wrapper: "",
      },
      value: 2,
    },
    {
      classes: {
        icon: "i-material-symbols-mode-comment-rounded",
        wrapper: "ml-auto mr-10",
      },
      value: 20,
    },
    {
      classes: {
        icon: "i-ri-heart-3-fill",
        wrapper: "",
      },
      value: 98,
    },
  ];
</script>

<!-- card -->
<div class="w-full p-4 flex">
  <!-- left side -->
  <div class="w-2.6rem mr-3">
    <!-- img wrapper -->
    <div class="h-2.6rem rounded-2xl overflow-hidden">
      <img class="h-full" src="/myavatar.png" alt="" />
    </div>
  </div>

  <!-- right side -->
  <div class="flex-1">
    <!-- card header -->
    <div class="flex-u-between-baseline h-5 mb-2">
      <h3 class="font-semibold">Haniel Ubogu</h3>

      <!-- date since posted -->
      <div>21h</div>
    </div>

    <!-- tweet content -->
    <p class="mb-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
      dicta aliquid cum soluta beatae perspiciatis repellat porro at temporibus
      eius!
    </p>

    <!-- card footer -->
    <div class="flex-u-between">
      {#each cardActions as { classes, value }}
        <!-- action wrapper -->
        <div class="flex-u-center gap-2 text-base-content/60 {classes.wrapper}">
          <!-- icon wrapper -->
          <div class="flex">
            <div class={classes.icon} />
          </div>
          <div>{value}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
