<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const { authType } = data;
  const userAction = authType == "login" ? "Login" : "Sign up";
</script>

<div class="px-4 grid items-center h-screen absolute top-0 left-0 w-full">
  <div class="w-full px-6">
    <h1 class="font-semibold text-2xl mb-5">
      {userAction}
    </h1>

    <form
      class="flex flex-col gap-4 [&_>_input]:border"
      method="post"
      action={authType == "signup" ? "?/register" : "?/login"}
    >
      <input
        class="px-4 h-3rem bg-base-100 w-full rounded-sm"
        placeholder={authType == "login" ? "Email or Username" : "Email"}
        name={authType == "login" ? "userid" : "email"}
        type="text"
      />

      <input
        class="px-4 h-3rem bg-base-100 w-full rounded-sm"
        placeholder="Password"
        name="password"
        type="password"
      />

      {#if authType == "signup"}
        <input
          class="px-4 h-3rem bg-base-100 w-full rounded-sm"
          placeholder="Confirm Password"
          name="confirm-password"
          type="password"
        />
      {/if}

      <button class="bg-primary text-primary-content w-full py-1.8 rounded-sm">
        {userAction}
      </button>
    </form>
  </div>
</div>
