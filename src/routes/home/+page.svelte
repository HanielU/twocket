<script lang="ts">
  import TweetCard from "$lib/components/TweetCard.svelte";
  import { trpc } from "$trpc/client";

  async function ge() {
    // const data = await trpc().user.get.query();
    // console.log(data);
  }
</script>

<div>
  <button on:click={ge}>Get ot </button>
  <TweetCard />
</div>
