<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h3>
    {data.user.name}
  </h3>
  <h5>
    @{data.user.username}
  </h5>
</div>
